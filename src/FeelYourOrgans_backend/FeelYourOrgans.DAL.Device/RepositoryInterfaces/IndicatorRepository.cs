using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.DAL.Device.Repositories;
using FeelYourOrgans.Middleware.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.Device.RepositoryInterfaces
{
    public class IndicatorRepository : IIndicatorRepository
    {
        public async Task<IEnumerable<Indicator>> Get()
        {
            using (var context = new MicroserviceDbContext())
            {
                return await context.Set<Indicator>()
                    .ToListAsync();
            }
        }

        public async Task<bool> IsExist(int[] ids)
        {
            using (var context = new MicroserviceDbContext())
            {
                var isAllExists = true;

                foreach(var id in ids)
                {
                    isAllExists = await context.Set<Indicator>()
                        .AnyAsync(item => item.Id == id);

                    if (!isAllExists)
                        return false;
                }

                return isAllExists;
            }
        }
    }
}
