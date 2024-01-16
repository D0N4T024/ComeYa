namespace ComeYaAPI.Models.DTOs.ItemDTOs
{
    public class ReadItemDTO
    {
        public int Id { get; set; }

        public string Food { get; set; } = null!;
        public string Category { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Price { get; set; }

        public string Image { get; set; } = null!;
        public string Name { get; set; } = null!;

        public string Restaurant { get; set; } = null!;
        public int RestaurantId { get; set; }
        public ulong Combo {  get; set; }
        public string MarketingImg1 { get; set; }
        public string MarketingImg2 { get; set; }


    }
}
