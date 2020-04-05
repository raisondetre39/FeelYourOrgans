using FeelYourOrgans.Contracts.Auth;
using FeelYourOrgans.Contracts.Entities;
using JWT;
using JWT.Serializers;
using JWT.Algorithms;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Security.Authentication;
using FeelYourOrgans.Contracts.Enums;

namespace FeelYourOrgans.Middleware.Authentication
{
    public class AuthenticationProvider
    {
        private const string SecretKey = "djksvurbdc.beudbuwd,djigbwe-jmdw737r0dhep";
        private const int Lifetime = 1800;
        private readonly IJsonSerializer _serializer;
        private readonly IDateTimeProvider _provider;
        private readonly IJwtValidator _validator;
        private readonly IBase64UrlEncoder _urlEncoder;
        private readonly IJwtDecoder _decoder;

        public AuthenticationProvider()
        {
            _serializer = new JsonNetSerializer();
            _provider = new UtcDateTimeProvider();
            _validator = new JwtValidator(_serializer, _provider);
            _urlEncoder = new JwtBase64UrlEncoder();
            _decoder = new JwtDecoder(_serializer, _validator, _urlEncoder);
        }

        public User GetUserFromToken(string jwtToken)
        {
            var claims = _decoder.DecodeToObject<ClaimsModel>(jwtToken);

            return new User()
            {
                Id = claims.Id,
                Email = claims.Email,
                IsAdmin = claims.IsAdmin
            };
        }

        public AuthenticationStatus Authenticate(string authToken, out User user)
        {
            var result = AuthenticationStatus.Success;
            user = null;

            if (string.IsNullOrWhiteSpace(authToken))
            {
                throw new AuthenticationException("Token is not provided");
            }

            try
            { 
                user = GetUserFromToken(authToken);
                _decoder.Decode(authToken, SecretKey, verify: true);
            }
            catch (TokenExpiredException)
            {
                result = AuthenticationStatus.TokenExpired;
            }
            catch (SignatureVerificationException)
            {
                result = AuthenticationStatus.TokenVerificationFailed;
            }

            return result;
        }

        public AuthenticationStatus GenerateToken(User user, out string token)
        {
            AuthenticationStatus result = AuthenticationStatus.Success;

            token = null;

            DateTime unixEpoch = UnixEpoch.Value;

            IDateTimeProvider provider = new UtcDateTimeProvider();

            DateTimeOffset now = provider.GetNow().AddSeconds(Lifetime);
            double secondsSinceEpoch = Math.Round((now - unixEpoch).TotalSeconds);

            Dictionary<string, object> payload = new Dictionary<string, object>
            {
                { "Expires  ", secondsSinceEpoch.ToString(CultureInfo.InvariantCulture) },
                { "Id", user.Id },
                { "Email", user.Email },
                { "IsAdmin", user.IsAdmin }
            };

            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();

            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            token = encoder.Encode(payload, SecretKey);

            return result;
        }
    }
}
