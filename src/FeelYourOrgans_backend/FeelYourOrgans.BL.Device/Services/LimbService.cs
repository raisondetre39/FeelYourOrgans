using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.DAL.Device.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.Device.Services
{
    public class LimbService : ILimbService
    {
        private readonly ILimbRepository _limbRepository;

        public LimbService(ILimbRepository limbRepository)
        {
            _limbRepository = limbRepository;
        }

        public async Task<IEnumerable<Limb>> GetLimbs()
        {
            return await _limbRepository.Get();
        }
    }
}
