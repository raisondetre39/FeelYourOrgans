using FeelYourOrgans.BL.User.ServiceInterfaces;
using FeelYourOrgans.Contracts.Auth;
using FeelYourOrgans.Contracts.Enums;
using FeelYourOrgans.Contracts.Responses;
using FeelYourOrgans.DAL.User.RepositoryInterfaces;
using FeelYourOrgans.Middleware.Authentication;
using FeelYourOrgans.Middleware.Security;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.User.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly AuthenticationProvider _authenticationProvider;
        private readonly IUserRepository _userRepository;

        public AuthenticationService(IUserRepository userRepository)
        {
            _authenticationProvider = new AuthenticationProvider();
            _userRepository = userRepository;
        }

        public async Task<AuthenticationResponse> GenerateToken(LoginModel loginModel)
        {
            var user = await _userRepository
                .GetBy(item => item.Email == loginModel.Email
                    && item.Password.CompareHashedStrings(loginModel.Password));

            if (user == null)
                return new AuthenticationResponse() { Status = AuthenticationStatus.UserNotFound };


            return new AuthenticationResponse()
            {
                Status = _authenticationProvider.GenerateToken(user, out string token),
                Token = token,
                IsAdmin = user.IsAdmin,
                UserId = user.Id
            };
        }

        public AuthenticationResponse RefreshToken(string token)
        {
            string newToken = string.Empty;

            var authenticationResult = _authenticationProvider.Authenticate(token, out var user);

            if (user == null)
                return new AuthenticationResponse() { Status = AuthenticationStatus.TokenVerificationFailed };


            if (authenticationResult == AuthenticationStatus.Success ||
                authenticationResult == AuthenticationStatus.TokenExpired)
            {
                authenticationResult = _authenticationProvider.GenerateToken(user, out newToken);
            }

            return new AuthenticationResponse()
            {
                Status = authenticationResult,
                Token = newToken
            };
        }
    }
}
