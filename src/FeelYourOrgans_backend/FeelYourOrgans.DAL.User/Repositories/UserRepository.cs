using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.Contracts.Enums;
using FeelYourOrgans.DAL.User.RepositoryInterfaces;
using FeelYourOrgans.Middleware.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FeelYourOrgans.DAL.User.Repositories
{
    public class UserRepository : IUserRepository
    {
        public async Task<CreateUserStatus> Create(Contracts.Entities.User entity)
        {
            using (var context = new MicroserviceDbContext())
            {
                var isIotExists = await context.Set<Iot>()
                    .AnyAsync(iot => iot.Id == entity.Id);

                if (!isIotExists)
                    return CreateUserStatus.IotNotExists;

                var isEmailUnique = await IsEmailUnique(entity.Email);

                if (!isEmailUnique)
                    return CreateUserStatus.NonUniqueEmail;

                await context.AddAsync(entity);
                await context.SaveChangesAsync();

                return CreateUserStatus.Success;
            }
        }

        public async Task<Contracts.Entities.User> GetById(int id)
        {
            using (var context = new MicroserviceDbContext())
            {
                return await context.Set<Contracts.Entities.User>()
                    .Include(item => item.Iot)
                    .ThenInclude(item => item.Limb)
                    .FirstOrDefaultAsync(item => item.Id == id);
            }
        }

        private async Task<bool> IsEmailUnique(string email)
        {
            using (var context = new MicroserviceDbContext())
            {
                return !(await context.Set<Contracts.Entities.User>()
                    .AnyAsync(item => item.Email == email));
            }
        }
    }
}
