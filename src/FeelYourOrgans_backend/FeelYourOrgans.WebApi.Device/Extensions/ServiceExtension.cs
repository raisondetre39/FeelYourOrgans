using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.BL.Device.Services;
using FeelYourOrgans.DAL.Device.Repositories;
using FeelYourOrgans.DAL.Device.RepositoryInterfaces;
using Microsoft.Extensions.DependencyInjection;

namespace FeelYourOrgans.WebApi.Device.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddSingleton<IIndicatorRepository, IndicatorRepository>();
            services.AddSingleton<ILimbRepository, LimbRepository>();
            services.AddSingleton<IRecordRepository, RecordRepository>();
            services.AddSingleton<IIotRepository, IotRepository>();
            services.AddSingleton<IIotService, IotService>();
            services.AddSingleton<ILimbService, LimbService>();
            services.AddSingleton<IIndicatorService, IndicatorService>();
            services.AddSingleton<IRecordService, RecordService>();
        }
    }
}
