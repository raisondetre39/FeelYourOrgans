using Newtonsoft.Json;
using System.Collections.Generic;

namespace FeelYourOrgans.Contracts.Entities
{
    public class Indicator : BaseEntity
    {
        public string Name { get; set; }

        public int MaxIndicatorVakue { get; set; }

        public int MinIndicatorValue { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
        public virtual List<IotIndicator> DeviceIndicators { get; set; }
    }
}
