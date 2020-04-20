using AutoMapper;
using FeelYourOrgans.Contracts.Requests;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace FeelYourOrgans.WebApi.User.Extensions
{
    public static class MappingExtension
    {
        public static void AddMappings(this IServiceCollection services)
        {
            services.AddSingleton(CreateMapper());
        }
        public static IMapper CreateMapper()
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CreateUserRequest, Contracts.Entities.User>().ReverseMap();
                cfg.CreateMap<UpdateUserRequest, Contracts.Entities.User>().ReverseMap();
            });
            return mapperConfig.CreateMapper();
        }

        private static void Register<TSource, TTarget>(IServiceCollection services)
        {
            services.AddSingleton<Func<TSource, TTarget>>(
                            serviceProvider =>
                            sourceInstance =>
                            serviceProvider.GetService<IMapper>().Map<TTarget>(sourceInstance));
        }
    }
}
