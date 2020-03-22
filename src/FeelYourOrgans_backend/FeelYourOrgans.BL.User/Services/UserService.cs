using FeelYourOrgans.BL.User.ServiceInterfaces;
using FeelYourOrgans.Contracts.Enums;
using FeelYourOrgans.DAL.User.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.User.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<CreateUserStatus> Create(Contracts.Entities.User request)
        {
            request.Password = request.Password;

            return await _userRepository.Create(request);
        }

        public async Task<Contracts.Entities.User> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }
    }
}
