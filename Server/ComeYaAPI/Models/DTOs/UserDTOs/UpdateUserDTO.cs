namespace ComeYaAPI.Models.DTOs.UserDTOs
{
    public class UpdateUserDTO
    {
        public string? Email { get; set; } 

        public string? Password { get; set; } 

        public string? PasswordConfirmed { get; set; }

        public string? Name { get; set; } 
        public string? Lname { get; set; } 

        public string? Phone { get; set; } 

        public string? Genre { get; set; } 

        public int StatusId { get; } = 1;
    }
}
