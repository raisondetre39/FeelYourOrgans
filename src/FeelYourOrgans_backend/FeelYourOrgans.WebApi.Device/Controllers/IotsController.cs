using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.Contracts.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using FeelYourOrgans.Contracts.Requests;
using AutoMapper;

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
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDevice(int id)
        {
            if (id <= 0)
                return BadRequest("Not valid id value");

            var device = await _iotService.GetDevice(id);

            if (device == null)
                return NotFound($"Device with id: {id} not found");

            return Ok(device);
        }

        [HttpPost]
        public async Task<IActionResult> AddIotDevice([FromBody] CreateDeviceRequest request)
        {
            var result = await _iotService.CreateDevice(_mapper.Map<Iot>(request));

            if (result == Contracts.Enums.CreateDeviceStatus.IndicatorNotExists)
                return BadRequest("Indicators do not exist");            
            else if (result == Contracts.Enums.CreateDeviceStatus.LimbNotExists)
                return BadRequest($"Limb id: {request.LimbId} do not exist");
            else  
                return Created("Iot", request);
        }
    }
}