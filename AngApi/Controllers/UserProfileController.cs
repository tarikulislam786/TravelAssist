﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AngApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        [HttpGet]
        //[Route("UserProfile")]
       // [Authorize]
        //Get: /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FirstName,
                user.LastName,
                user.UserName,
                user.Email,
                user.Id
            };
        }

        [HttpGet]
        [Authorize(Roles ="Admin")]
        [Route("ForAdmin")]
        public string GetForAdmin()
        {
            return "Web method for admin";
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("ForUser")]
        public string GetForUser()
        {
            return "Web method for user";
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        [Route("ForAdminOrUser")]
        public string GetForAdminOrUser()
        {
            return "Web method for admin or user";
        }

        
    }
}