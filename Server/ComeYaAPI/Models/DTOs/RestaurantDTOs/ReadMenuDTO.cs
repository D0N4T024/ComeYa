using ComeYaAPI.Models.DTOs.ItemDTOs;

namespace ComeYaAPI.Models.DTOs.RestaurantDTOs
{
    public class ReadMenuDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Logo { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Rating { get; set; }
        public string Background { get; set; } = null!;
        public string MarketingImg { get; set; }
        public List<ReadItemDTO> Items { get; set; }
    }
}
