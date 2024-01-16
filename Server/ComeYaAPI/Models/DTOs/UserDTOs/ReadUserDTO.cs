namespace ComeYaAPI.Models.DTOs.UserDTOs
{
    public class ReadUserDTO
    {
        public int Id { get; set; }

        public string Email { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string Name { get; set; } = null!;

        public string Lname { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string Genre { get; set; } = null!;

        public string ActivationCode { get; set; } = null!;   
        public decimal Balance { get; set; }

        public int StatusId { get; set; }
    }
}
