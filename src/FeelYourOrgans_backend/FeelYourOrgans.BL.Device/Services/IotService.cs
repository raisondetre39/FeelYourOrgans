using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.Contracts.Enums;
using FeelYourOrgans.DAL.Device.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.Device.Services
{
    public class IotService : IIotService
    {
        private readonly IIotRepository _iotRepository;

        public IotService(IIotRepository iotRepository)
        {
            _iotRepository = iotRepository;
        }

        public async Task<CreateDeviceStatus> CreateDevice(Iot request)
        {
            return await _iotRepository.Create(request);
        }

        public async Task<Iot> GetDevice(int id, int userId)
        {
            return await _iotRepository.GetById(id, userId);
        }

        public async Task<IEnumerable<Iot>> GetDevices()
        {
            return await _iotRepository.Get();
        }
        
        public async Task DeleteDevice(int id)
        {
            await _iotRepository.DeleteAsync(id);
        }
    }
}
