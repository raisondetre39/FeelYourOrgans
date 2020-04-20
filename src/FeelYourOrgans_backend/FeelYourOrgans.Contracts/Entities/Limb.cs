using Newtonsoft.Json;
using System.Collections.Generic;

namespace FeelYourOrgans.Contracts.Entities
{
    public class Limb : BaseEntity
    {
        public string Name { get; set; }

        [JsonIgnore]
        public virtual List<Iot> Devices { get; set; }
    }
}
