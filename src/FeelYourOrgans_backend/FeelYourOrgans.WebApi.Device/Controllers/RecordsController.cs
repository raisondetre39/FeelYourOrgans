using AutoMapper;
using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.Contracts.Entities;
using FeelYourOrgans.Contracts.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FeelYourOrgans.WebApi.Device.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordsController : ControllerBase
    {
        private readonly IRecordService _recordService;
        private readonly IMapper _mapper;

        public RecordsController(IRecordService recordService, IMapper mapper)
        {
            _recordService = recordService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddRecord([FromBody] AddIotRecordRequest request)
        {
            await _recordService.AddIotRecord(_mapper.Map<IotRecord>(request));

            return Ok();
        }
    }
}