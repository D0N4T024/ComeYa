namespace ComeYaAPI.Models.ResultsMessages
{
    public class EntityListResult<T> where T : class
    { 
        public IEnumerable<T>? Entity { get; set; }
        public int StatusCode { get; set; }
        public string? Message { get; set; }
    }
}
