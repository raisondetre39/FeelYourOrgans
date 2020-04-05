using Newtonsoft.Json;

namespace FeelYourOrgans.Contracts.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public virtual Iot Iot { get; set; }

        public int? IotId { get; set; }

        public bool IsAdmin { get; set; }
    }
}
