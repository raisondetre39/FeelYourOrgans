﻿using System;

namespace FeelYourOrgans.Contracts.Requests
{
    public class AddIotRecordRequest
    {
        public double Value { get; set; }

        public bool IsCritical { get; set; }

        public DateTime RecordDate { get; set; }
    }
}
