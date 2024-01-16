namespace ComeYaAPI.Models.DTOs.CartDTOs
{
    public class ShowCartItemDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;

        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
        public string Image { get; set; } = null!;

    }
}
