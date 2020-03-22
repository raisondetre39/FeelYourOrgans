using FeelYourOrgans.Contracts.Enums;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Text;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.User.RepositoryInterfaces
{
    public interface IUserRepository
    {
        Task<Contracts.Entities.User> GetById(int id);

        Task<CreateUserStatus> Create(Contracts.Entities.User request);
    }
}
