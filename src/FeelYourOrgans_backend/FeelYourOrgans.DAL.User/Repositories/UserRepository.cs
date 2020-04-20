using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.Contracts.Enums;
using FeelYourOrgans.DAL.User.RepositoryInterfaces;
using FeelYourOrgans.Middleware.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
                    .AnyAsync(iot => iot.Id == entity.IotId);

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

        public async Task<Contracts.Entities.User> GetBy(Expression<Func<Contracts.Entities.User, bool>> expression)
        {
            using (var context = new MicroserviceDbContext())
            {
                return await context.Set<Contracts.Entities.User>()
                    .FirstOrDefaultAsync(expression);
            }
        }

        public async Task<IEnumerable<Contracts.Entities.User>> Get()
        {
            using (var context = new MicroserviceDbContext())
            {
                return await context.Set<Contracts.Entities.User>()
                    .Include(item => item.Iot)
                    .ThenInclude(item => item.Limb)
                    .Where(item => !item.IsAdmin)
                    .ToListAsync();
            }
        }

        private async Task<bool> IsEmailUnique(string email, int id = 0)
        {
            using (var context = new MicroserviceDbContext())
            {
                if (id == 0)
                return !(await context.Set<Contracts.Entities.User>()
                    .AnyAsync(item => item.Email == email));

                return !(await context.Set<Contracts.Entities.User>()
                    .AnyAsync(item => item.Email == email && item.Id != id));
            }
        }

        public async Task<UpdateUserStatus> UpdateAsync(Contracts.Entities.User entity)
        {
            using (var context = new MicroserviceDbContext())
            {
                var isUnique = await IsEmailUnique(entity.Email, entity.Id);

                if (!isUnique)
                    return UpdateUserStatus.NonUniqueEmail;

                var user = context.Set<Contracts.Entities.User>()
                    .FirstOrDefault(item => item.Id == entity.Id);

                user.LastName = entity.LastName;
                user.FirstName = entity.FirstName;
                user.Email = entity.Email;

                context.Update(user);
                await context.SaveChangesAsync();

                return UpdateUserStatus.Success;
            }
        }

        public async Task DeleteAsync(int id)
        {
            using (var context = new MicroserviceDbContext())
            {
                var user = await context.Set<Contracts.Entities.User>()
                    .FirstOrDefaultAsync(item => item.Id == id);

                if (user != null)
                {
                    context.Set<Contracts.Entities.User>()
                      .Remove(user);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
