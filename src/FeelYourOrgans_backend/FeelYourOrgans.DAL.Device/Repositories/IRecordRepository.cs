using FeelYourOrgans.Contracts.Entities;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.Device.Repositories
{
    public interface IRecordRepository
    {
        Task AddRecord(IotRecord record);
    }
}
