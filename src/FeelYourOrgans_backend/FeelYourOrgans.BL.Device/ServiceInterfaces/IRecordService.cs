using FeelYourOrgans.Contracts.Entities;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.Device.ServiceInterfaces
{
    public interface IRecordService
    {
        Task AddIotRecord(IotRecord record);
    }
}
