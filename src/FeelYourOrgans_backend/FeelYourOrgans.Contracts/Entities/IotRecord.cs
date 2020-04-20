﻿using Newtonsoft.Json;
using System;

namespace FeelYourOrgans.Contracts.Entities
{
    public class IotRecord : BaseEntity
    {
        public int IotIndicatorId { get; set; }

        [JsonIgnore]
        public virtual IotIndicator IotIndicator { get; set; }

        public double Value { get; set; }
        
        public bool IsCritical { get; set; }

        public DateTime RecordDate { get; set; }
    }
}
