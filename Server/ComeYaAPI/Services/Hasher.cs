using NuGet.Protocol.Plugins;

namespace ComeYaAPI.Services
{
    public class Hasher
    {

        public string HashedPassword(string password, string salt)
        {

            string passwordHashed = BCrypt.Net.BCrypt.EnhancedHashPassword(password + salt, 13);

            return passwordHashed;
        }

        public bool VerifyPassword(string passwordLogged,string password, string salt)
        {
            bool passwordVerified = BCrypt.Net.BCrypt.EnhancedVerify(password+salt,passwordLogged );
           
            return passwordVerified;
        }


    }
}
