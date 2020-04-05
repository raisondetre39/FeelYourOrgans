using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.DAL.Device.Repositories;
using FeelYourOrgans.Middleware.Shared;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.Device.RepositoryInterfaces
{
    public class RecordRepository : IRecordRepository
    {
        public async Task AddRecord(IotRecord record)
        {
            using (var context = new MicroserviceDbContext())
            {
                await context.AddAsync(record);
                await context.SaveChangesAsync();
            }
        }
    }
}
