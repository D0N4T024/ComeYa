using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComeYaAPI.Context;
using ComeYaAPI.Services;
using ComeYa.Interfaces;
using AutoMapper;
using ComeYaAPI.Models.DTOs.UserDTOs;

namespace ComeYaAPI.Controllers
{
    [Route("ComeYa/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        
        private readonly IWebToken _webToken;
        private readonly EmailService _email;

        public UsersController(IUnitOfWork unitOfWork,EmailService email, IWebToken webToken)
        {
            _unitOfWork = unitOfWork;
            _webToken = webToken;
            _email = email;
            
           
        }

        // GET: api/Users
        [HttpGet]
        [Route("AllUsers")]
       public async Task<ActionResult<IEnumerable<User>>> GetUsers(string? genre, int page =0)
       {
            //return Ok(await _unitOfWork.Users.GetAllAsync());
            var users = await _unitOfWork.Users.GetAllUsers(genre,page);
            return Ok(users.Entity);
       }

       
        [HttpPost]
        [Route("Register")]
        
        public async Task<ActionResult> Register([FromBody] CreateUserDTO userDTO)
        {
            try
            {
                _unitOfWork.BeginTransaction();
                var userResult = await _unitOfWork.Users.AddUser(userDTO);

                if (userResult.Entity != null)
                {

                    await _unitOfWork.Complete();
                   
                    await _email.SendEmail(userResult.Entity.Email, userResult.Entity.ActivationCode);
                    return Ok("Usuario ingresado.");
                }
                if (userResult.StatusCode == 409) return Conflict(userResult.Message);
                return BadRequest(userResult.Message);
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return BadRequest(ex.Message);
            }
            
           
        }

        [HttpPost]
        [Route("Auth/SignIn")]
        public async Task<ActionResult<User>> Login([FromBody] LoginUserDTO userDTO)
        {
            string token;
            var user = await _unitOfWork.Users.Login(userDTO);

            if (user.Entity != null)
            {

                token = _webToken.SendToken(user.Entity.Id, user.Entity.Name, user.Entity.Lname, user.Entity.Genre, user.Entity.Phone,user.Entity.Email);
                _unitOfWork.Dispose();

                return Ok(new { Token = token, RedirectUrl = $"/Home" });

            }

            return BadRequest(user.Message);




        }
        // Activar usuario

        [HttpPatch]
        [Route("ActivateUser")]

        public async Task<ActionResult<User>> Activate([FromBody] string code)
        {

            
            try
            {
                _unitOfWork.BeginTransaction();
                var user = await _unitOfWork.Users.ActivateUser(code);
                await _unitOfWork.Complete();
                _unitOfWork.Dispose();

                return Ok(user.Entity);


            }catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id =0)
        {
            if (id == 0) id = _webToken.GetUserId();

            var user =await _unitOfWork.Users.GetUserById(id);
            _unitOfWork.Dispose();

            return Ok(user.Entity);
        }
    }
}
