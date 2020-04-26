using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.Contracts.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using FeelYourOrgans.Contracts.Requests;
using AutoMapper;
using System.Linq;

namespace FeelYourOrgans.WebApi.Device.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IotsController : ControllerBase
    {
        private readonly IIotService _iotService;
        private readonly IMapper _mapper;

        public IotsController(IIotService iotService, IMapper mapper)
        {
            _iotService = iotService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<Iot>> GetDevices()
        {
            return await _iotService.GetDevices();
        }  
        
        [HttpGet("{id}/user/{uid}")]
        public async Task<IActionResult> GetDevice([FromRoute]int id, [FromRoute]int uid)
        {
            if (id <= 0 || uid <= 0)
                return BadRequest("Not valid id value");

            var device = await _iotService.GetDevice(id, uid);

            if (device == null)
                return NotFound($"Device with id: {id} not found");

            return Ok(device);
        }

        [HttpPost]
        public async Task<IActionResult> AddIotDevice([FromBody] CreateDeviceRequest request)
        {
            var device = _mapper.Map<Iot>(request);
            device.IotIndicators = request.IndicatorIds
                .Select(item => new IotIndicator() { IndicatorId = item })
                .ToList();

            var result = await _iotService.CreateDevice(device);

            if (result == Contracts.Enums.CreateDeviceStatus.IndicatorNotExists)
                return BadRequest("Indicators do not exist");            
            else if (result == Contracts.Enums.CreateDeviceStatus.LimbNotExists)
                return BadRequest($"Limb id: {request.LimbId} do not exist");
            else  
                return Created("Iot", request);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            if (id <= 0)
                return BadRequest("Not valid id value");

            await _iotService.DeleteDevice(id);

            return Ok();
        }
    }
}