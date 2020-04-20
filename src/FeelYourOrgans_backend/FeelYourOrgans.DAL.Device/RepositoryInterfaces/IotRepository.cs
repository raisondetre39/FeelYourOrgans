using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.Contracts.Enums;
using FeelYourOrgans.DAL.Device.Repositories;
using FeelYourOrgans.Middleware.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.Device.RepositoryInterfaces
{
    public class IotRepository : IIotRepository
    {
        private readonly ILimbRepository _limbRepository;
        private readonly IIndicatorRepository _indicatorRepository;

        public IotRepository(
            IIndicatorRepository indicatorRepository,
            ILimbRepository limbRepository)
        {
            _indicatorRepository = indicatorRepository;
            _limbRepository = limbRepository;
        }

        public async Task<CreateDeviceStatus> Create(Iot entity)
        {
            using (var context = new MicroserviceDbContext())
            {
                var limb = await _limbRepository.GetById(entity.LimbId);

                if (limb == null)
                    return CreateDeviceStatus.LimbNotExists;

                var isIndicatorsExists = await _indicatorRepository
                    .IsExist(entity.IotIndicators.Select(item => item.IndicatorId).ToArray());

                if (!isIndicatorsExists)
                    return CreateDeviceStatus.IndicatorNotExists;

                await context.AddAsync(entity);
                await context.SaveChangesAsync();

                return CreateDeviceStatus.Success;
            }
        }

        public async Task<IEnumerable<Iot>> Get()
        {
            using (var context = new MicroserviceDbContext())
            {
                return await context.Set<Iot>().Include(iten => iten.Limb)
                    .ToListAsync();
            }
        }

        public async Task<Iot> GetById(int id)
        {
            using (var context = new MicroserviceDbContext())
            {
                var iot = await context.Set<Iot>().Include(item => item.IotIndicators)
                    .Include(iten => iten.Limb)
                    .FirstOrDefaultAsync(item => item.Id == id);

                iot.IotIndicators
                    .ForEach(ind => ind.Records = context.Set<IotRecord>()
                        .Where(item => item.IotIndicatorId == ind.Id).ToList());

                return iot;
            }
        }

        public async Task DeleteAsync(int id)
        {
            using (var context = new MicroserviceDbContext())
            {
                var iot = await context.Set<Iot>()
                    .FirstOrDefaultAsync(item => item.Id == id);

                if (iot != null)
                {
                    context.Set<Iot>()
                        .Remove(iot);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
