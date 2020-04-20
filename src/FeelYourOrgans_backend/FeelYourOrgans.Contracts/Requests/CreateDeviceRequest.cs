using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FeelYourOrgans.Contracts.Requests
{
    public class CreateDeviceRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int LimbId { get; set; }

        public IEnumerable<int> IndicatorIds { get; set; }
    }
}
