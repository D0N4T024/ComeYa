using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Nest;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ComeYaAPI.Services
{
    public interface IWebToken
    {
        int GetUserId();
        string GetUserEmail();
        string SendToken(int Id, string Name, string Lname, string Genre, string Phone, string Email);
    }
    public class WebToken: IWebToken
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public WebToken( IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }

        public string Key => _configuration["Jwt:Key"]!;

        public string SendToken(int Id, string Name, string Lname, string Genre, string Phone, string Email)
        {
            var claims = new List<Claim>
            {
                new Claim("Id", Id.ToString()),
                new Claim("Name", Name),
                new Claim("Phone", Phone),
                new Claim("Genre", Genre),
                new Claim("Lname", Lname),
                new Claim(ClaimTypes.Email,Email),
                
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public int GetUserId()
        {
            int id = 0;
            if( _httpContextAccessor != null )
            {
                id = int.Parse(_httpContextAccessor.HttpContext.User.Claims.First().Value);
            }
          
            return id;
        }

        public string GetUserEmail()
        {
            string email = string.Empty;
            if (_httpContextAccessor != null)
            {
                email = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            }

            return email;
        }
    }
}
