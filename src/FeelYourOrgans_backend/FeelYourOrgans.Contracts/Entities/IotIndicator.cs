using Newtonsoft.Json;
using System.Collections.Generic;

namespace FeelYourOrgans.Contracts.Entities
{
    public class IotIndicator : BaseEntity
    {
        public int IotId { get; set; }

        [JsonIgnore]
        public virtual Iot Iot { get; set; }

        public int IndicatorId { get; set; }

        [JsonIgnore]
        public virtual Indicator Indicator { get; set; }

        public virtual List<IotRecord> Records { get; set; }
    }
}
