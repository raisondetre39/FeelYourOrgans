using FeelYourOrgans.Contracts.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace FeelYourOrgans.Contracts.Responses
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }

        public int UserId { get; set; }

        public bool IsAdmin { get; set; }

        [JsonIgnore]
        public AuthenticationStatus Status { get; set; }
    }
}
