using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.DAL.Device.Repositories;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.Device.Services
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _recordRepository;

        public RecordService(IRecordRepository recordRepository)
        {
            _recordRepository = recordRepository;
        }

        public async Task AddIotRecord(IotRecord record)
        {
            await _recordRepository.AddRecord(record);
        }
    }
}
