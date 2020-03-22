using FeelYourOrgans.Contracts.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.Device.ServiceInterfaces
{
    public interface IIndicatorService
    {
        Task<IEnumerable<Indicator>> GetIndicators();
    }
}
