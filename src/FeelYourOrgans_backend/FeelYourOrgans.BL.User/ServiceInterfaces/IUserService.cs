using FeelYourOrgans.Contracts.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.User.ServiceInterfaces
{
    public interface IUserService
    {
        Task<Contracts.Entities.User> GetById(int id);

        Task<CreateUserStatus> Create(Contracts.Entities.User request);
    }
}
