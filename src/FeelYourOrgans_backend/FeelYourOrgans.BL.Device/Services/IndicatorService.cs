using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.DAL.Device.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.Device.Services
{
    public class IndicatorService : IIndicatorService
    {
        private readonly IIndicatorRepository _indicatorRepository;

        public IndicatorService(IIndicatorRepository indicatorRepository)
        {
            _indicatorRepository = indicatorRepository;
        }

        public async Task<IEnumerable<Indicator>> GetIndicators()
        {
            return await _indicatorRepository.Get();
        }
    }
}
