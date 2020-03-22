using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FeelYourOrgans.Contracts.Entities
{
    public class Iot : BaseEntity
    {
        public string Name { get; set; }

        public virtual Limb Limb { get; set; }

        public int LimbId { get; set; }

        public virtual List<IotIndicator> IotIndicators { get; set; }

        [JsonIgnore]
        public virtual List<User> Users { get; set; }
    }
}
