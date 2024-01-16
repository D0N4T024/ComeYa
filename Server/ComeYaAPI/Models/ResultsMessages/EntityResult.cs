using ComeYaAPI.Context;

namespace ComeYaAPI.Models.ResultsMessages
{
    public class EntityResult<T> where T : class
    {
        public T? Entity { get; set; }
        public int StatusCode { get; set; }
        public string? Message { get; set; }

    }

}
