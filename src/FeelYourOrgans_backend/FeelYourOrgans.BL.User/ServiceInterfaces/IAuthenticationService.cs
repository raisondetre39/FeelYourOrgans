using FeelYourOrgans.Contracts.Auth;
using FeelYourOrgans.Contracts.Responses;
using System.Threading.Tasks;

namespace FeelYourOrgans.BL.User.ServiceInterfaces
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResponse> GenerateToken(LoginModel loginModel);

        AuthenticationResponse RefreshToken(string token);
    }
}
