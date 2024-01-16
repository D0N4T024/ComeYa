namespace ComeYaAPI.Models.DTOs.UserDTOs
{
    public class CreateUserDTO
    {

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string PasswordConfirmed { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string Lname { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string Genre { get; set; } = null!;

        public int StatusId { get; } = 1;

       

   

      
    }
}
