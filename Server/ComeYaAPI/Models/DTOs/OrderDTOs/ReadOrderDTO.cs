namespace ComeYaAPI.Models.DTOs.OrderDTOs
{
    public class ReadOrderDTO
    {
        public string Code { get; set; } = null!;
        public decimal Amount { get; set; }
        public string Date { get; set; }=null!;
        public string Receipt { get; set; } = null!;
        public string Status { get; set; } = null!;
        public decimal Taxes { get; set; } 
        public List<ReadOrderItemDTO> Items { get; set; } = null!;

    }
}
