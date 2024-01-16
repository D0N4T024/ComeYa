namespace ComeYaAPI.Models.DTOs.RestaurantDTOs
{
    public class CreateRestaurantDTO
    {
        public string Name { get; set; }
        public decimal Rating { get; set; }
        public string Logo { get; set; }
        public string MarketingImg { get; set; }
        public string Description { get; set; }
        public string Background { get; set; }

    }
}
