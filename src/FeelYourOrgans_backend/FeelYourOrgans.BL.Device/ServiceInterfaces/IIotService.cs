using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.Contracts.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.Device.ServiceInterfaces
{
    public interface IIotService
    {
        Task<IEnumerable<Iot>> GetDevices();

        Task<CreateDeviceStatus> CreateDevice(Iot request);

        Task<Iot> GetDevice(int id);

        Task DeleteDevice(int id);
    }
}
