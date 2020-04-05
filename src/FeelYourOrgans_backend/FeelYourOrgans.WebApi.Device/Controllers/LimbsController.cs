using FeelYourOrgans.BL.Device.ServiceInterfaces;
using FeelYourOrgans.Contracts.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.WebApi.Device.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LimbsController : ControllerBase
    {
        private readonly ILimbService _limbService;

        public LimbsController(ILimbService limbService)
        {
            _limbService = limbService;
        }

        [HttpGet]
        public async Task<IEnumerable<Limb>> GetLimbs()
        {
            return await _limbService.GetLimbs();
        }
    }
}