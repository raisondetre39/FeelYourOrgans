using Newtonsoft.Json;

namespace FeelYourOrgans.Contracts.ExceptionHandler
{
    public class ExceptionModel
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }


        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
