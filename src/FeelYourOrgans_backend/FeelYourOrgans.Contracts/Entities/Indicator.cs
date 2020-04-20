using Newtonsoft.Json;
using System.Collections.Generic;

namespace FeelYourOrgans.Contracts.Entities
{
    public class Indicator : BaseEntity
    {
        public string Name { get; set; }

        public double MaxIndicatorValue { get; set; }

        public double MinIndicatorValue { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
        public virtual List<IotIndicator> DeviceIndicators { get; set; }
    }
}
