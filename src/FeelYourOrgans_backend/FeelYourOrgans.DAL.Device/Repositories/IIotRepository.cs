using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.Contracts.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.Device.Repositories
{
    public interface IIotRepository
    {
        Task<IEnumerable<Iot>> Get();

        Task<CreateDeviceStatus> Create(Iot request);

        Task<Iot> GetById(int id);

        Task DeleteAsync(int id);
    }
}
