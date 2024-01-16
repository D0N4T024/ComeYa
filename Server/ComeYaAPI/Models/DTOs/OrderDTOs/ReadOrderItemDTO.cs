namespace ComeYaAPI.Models.DTOs.OrderDTOs
{
    public class ReadOrderItemDTO
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; }= null!;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Amount { get; set; }
        public decimal Taxes { get; set; }

    }
}
