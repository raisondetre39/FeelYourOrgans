using FeelYourOrgans.Contracts.Enums;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.User.RepositoryInterfaces
{
    public interface IUserRepository
    {
        Task<Contracts.Entities.User> GetById(int id);

        Task<CreateUserStatus> Create(Contracts.Entities.User request);

        Task<IEnumerable<Contracts.Entities.User>> Get();

        Task<UpdateUserStatus> UpdateAsync(Contracts.Entities.User entity);

        Task DeleteAsync(int id);

        Task<Contracts.Entities.User> GetBy(Expression<Func<Contracts.Entities.User, bool>> expression);
    }
}
