namespace ComeYaAPI.Models.DTOs.BillsDTOs
{
    public class ReadBillDTO
    {
        public int Id { get; set; }

        public string OrderCode { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public decimal Taxes { get; set; }

        public decimal Balance { get; set; }

        public string BillCode { get; set; } = null!;

        public string Url { get; set; } = null!;
    }
}
