using FeelYourOrgans.BL.User.ServiceInterfaces;
using FeelYourOrgans.Contracts.Enums;
using FeelYourOrgans.DAL.User.RepositoryInterfaces;
using FeelYourOrgans.Middleware.Security;
using System.Collections.Generic;
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
           request.Password = request.Password.GetCryptedString();

            return await _userRepository.Create(request);
        }

        public async Task DeleteUser(int id)
        {
            await _userRepository.DeleteAsync(id);
        }

        public async Task<Contracts.Entities.User> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<IEnumerable<Contracts.Entities.User>> GetUsers()
        {
            return await _userRepository.Get();
        }

        public async Task<UpdateUserStatus> UpdateAsync(Contracts.Entities.User entity)
        {
            entity.Password = entity.Password.GetCryptedString();
            return await _userRepository.UpdateAsync(entity);
        }
    }
}
