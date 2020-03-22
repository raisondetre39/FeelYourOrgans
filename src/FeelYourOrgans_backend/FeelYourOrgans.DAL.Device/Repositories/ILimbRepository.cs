using FeelYourOrgans.Contracts.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.Device.Repositories
{
    public interface ILimbRepository
    {
        Task<IEnumerable<Limb>> Get();

        Task<Limb> GetById(int id);
    }
}
