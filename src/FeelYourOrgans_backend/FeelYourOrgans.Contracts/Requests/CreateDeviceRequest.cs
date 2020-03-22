using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FeelYourOrgans.Contracts.Requests
{
    public class CreateDeviceRequest
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Device name can't contain more than 10 symbols")]
        [MinLength(5, ErrorMessage = "Device name can't contain less than 5 symbols")]
        public string IotName { get; set; }

        [Required]
        public int LimbId { get; set; }

        public IEnumerable<int> IndicatorIds { get; set; }
    }
}
