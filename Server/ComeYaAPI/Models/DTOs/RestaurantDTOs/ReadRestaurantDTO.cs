namespace ComeYaAPI.Models.DTOs.RestaurantDTOs
{
    public class ReadRestaurantDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Logo { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Rating { get; set; }
        public string Background { get; set; } = null!;
        public string MarketingImg { get; set; }
    }
}
