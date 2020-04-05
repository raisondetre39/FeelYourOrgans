using FeelYourOrgans.BL.User.ServiceInterfaces;
using FeelYourOrgans.BL.User.Services;
using FeelYourOrgans.DAL.User.Repositories;
using FeelYourOrgans.DAL.User.RepositoryInterfaces;
using Microsoft.Extensions.DependencyInjection;

namespace FeelYourOrgans.WebApi.User.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<IAuthenticationService, AuthenticationService>();
        }
    }
}
