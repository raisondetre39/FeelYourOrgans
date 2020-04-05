using FeelYourOrgans.BL.User.ServiceInterfaces;
using FeelYourOrgans.Contracts.Auth;
using FeelYourOrgans.Contracts.Enums;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FeelYourOrgans.WebApi.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] LoginModel loginModel)
        {
            var result = await _authenticationService.GenerateToken(loginModel);

            if (result.Status == AuthenticationStatus.UserNotFound)
                return BadRequest("User not found");

            if (result.Status != AuthenticationStatus.Success)
                return Forbid("Access denied");

            return Ok(result);
        }

        [HttpPost("refresh")]
        public IActionResult RefreshToken(string jwtToken)
        {
            var result = _authenticationService.RefreshToken(jwtToken);

            if (result.Status == AuthenticationStatus.UserNotFound)
                return BadRequest("User not found");

            if (result.Status != AuthenticationStatus.Success)
                return Forbid("Access denied");

            return Ok(result.Token);
        }
    }
}