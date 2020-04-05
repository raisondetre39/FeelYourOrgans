using FeelYourOrgans.Contracts.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.User.ServiceInterfaces
{
    public interface IUserService
    {
        Task<Contracts.Entities.User> GetById(int id);

        Task<CreateUserStatus> Create(Contracts.Entities.User request);

        Task<UpdateUserStatus> UpdateAsync(Contracts.Entities.User entity);

        Task<IEnumerable<Contracts.Entities.User>> GetUsers();

        Task DeleteUser(int id);
    }
}
