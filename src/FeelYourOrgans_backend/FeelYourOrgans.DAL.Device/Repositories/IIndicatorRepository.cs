using FeelYourOrgans.Contracts.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.Device.Repositories
{
    public interface IIndicatorRepository
    {
        Task<IEnumerable<Indicator>> Get();

        Task<bool> IsExist(int[] ids);
    }
}
