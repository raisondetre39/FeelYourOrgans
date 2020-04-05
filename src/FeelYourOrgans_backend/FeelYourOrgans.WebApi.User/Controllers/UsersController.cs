using AutoMapper;
using FeelYourOrgans.BL.User.ServiceInterfaces;
using FeelYourOrgans.Contracts.Enums;
using FeelYourOrgans.Contracts.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeelYourOrgans.WebApi.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IEnumerable<Contracts.Entities.User>> GetUsers()
        {
            return await _userService.GetUsers();
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest("Not valid id value");

            var user = await _userService.GetById(id);

            if (user == null)
                return NotFound($"User with id: {id} not found");

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateUserRequest request)
        {
            if (request.IotId <= 0)
                return BadRequest("Iot id cann't be less or equal 0");

            var result = await _userService
                .Create(_mapper.Map<Contracts.Entities.User>(request));

            if (result == CreateUserStatus.IotNotExists)
                return NotFound($"Iot with id: {request.IotId} not found");

            if (result == CreateUserStatus.NonUniqueEmail)
                return BadRequest($"User with email: {request.Email} already exists");

            return Created("UserController", result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody]UpdateUserRequest request)
        {
            var user = _mapper.Map<Contracts.Entities.User>(request);
            user.Id = id;

            var result = await _userService.UpdateAsync(user);

            if (result == UpdateUserStatus.NonUniqueEmail)
                return BadRequest($"User with email: {request.Email} already exists");

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (id <= default(int))
                return BadRequest("Id should be more then 0");

            await _userService.DeleteUser(id);

            return Ok();
        }
    }
}