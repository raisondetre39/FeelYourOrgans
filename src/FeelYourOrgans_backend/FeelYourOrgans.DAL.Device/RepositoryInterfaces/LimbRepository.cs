using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.DAL.Device.Repositories;
using FeelYourOrgans.Middleware.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.Device.RepositoryInterfaces
{
    public class LimbRepository : ILimbRepository
    {
        public async Task<IEnumerable<Limb>> Get()
        {
            using (var context = new MicroserviceDbContext())
            {
                return await context.Set<Limb>()
                    .ToListAsync();
            }
        }

        public async Task<Limb> GetById(int id)
        {
            using (var context = new MicroserviceDbContext())
            {
                return await context.Set<Limb>()
                    .FirstOrDefaultAsync(item => item.Id == id);
            }
        }
    }
}
