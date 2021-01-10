using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AngApi.BLL;
using AngApi.DAL.Model;
using AngApi.DAL.ViewModel;
using AngApi.Models;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TouristPlaceController : ControllerBase
    {

        private readonly IMapper mapper;
        private readonly ITouristPlace blTouristPlace;
      //  private UserManager<ApplicationUser> _userManager;
        private IHostingEnvironment _hostingEnvironment;
        public TouristPlaceController(IMapper mapper, ITouristPlace touristPlace, IHostingEnvironment hostingEnvironment)
        {
            this.mapper = mapper;
            this.blTouristPlace = touristPlace;
           // _userManager = userManager;
            this._hostingEnvironment = hostingEnvironment;
        }

        // GET: api/TouristPlace
        [HttpGet]
        public IEnumerable<TouristPlaceViewModel> Get()
        {
            var touristPlaces = blTouristPlace.GetTouristPlaces();
            return mapper.Map<IEnumerable<TouristPlace>, IEnumerable<TouristPlaceViewModel>>(touristPlaces);
        }

        // GET: api/TouristPlace/5
        [HttpGet("{id}")]
        public TouristPlaceViewModel Get(int id)
        {
            var _touristPlace = blTouristPlace.GetTouristPlace(id);
            return mapper.Map<TouristPlace, TouristPlaceViewModel>(_touristPlace);
        }

        // POST: api/TouristPlace
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] TouristPlaceViewModel touristPlaceViewModel)
        {
            if (touristPlaceViewModel.Id >= 0)
            {
                string uniquefilename = null;
                if (touristPlaceViewModel.PhotoFile != null)
                { // if upload new photo
                    // remove the existing one first
                    if (touristPlaceViewModel.Image != null)
                    {
                        // unlink photo while updating photo
                        string removeFilename = touristPlaceViewModel.Image;
                        // var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\image\\Programcilar", "controlller.jpg");
                        var path = Path.Combine(_hostingEnvironment.WebRootPath, "Images", removeFilename);

                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }
                    }
                    // then upload photo
                    string uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "Images");
                    uniquefilename = Guid.NewGuid().ToString() + "_" + touristPlaceViewModel.PhotoFile.FileName;
                    string filepath = Path.Combine(uploadsFolder, uniquefilename);
                    touristPlaceViewModel.PhotoFile.CopyTo(new FileStream(filepath, FileMode.Create));
                    touristPlaceViewModel.Image = uniquefilename;
                }
                else
                { // when update form without photo uploading, keep the name as it is
                    touristPlaceViewModel.Image = touristPlaceViewModel.Image;
                }

                // InsertOrUpdate
                var _touristPlace = blTouristPlace.UpsertTouristPlace(touristPlaceViewModel);
            }

            return CreatedAtAction("Get", new { id = touristPlaceViewModel.Id }, touristPlaceViewModel);
        }



        // DELETE: api/TouristPlace/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // var touristPlace = await _context.TouristPlaces.FindAsync(id);
            var touristPlace = blTouristPlace.GetTouristPlace(id);
            if (touristPlace == null)
            {
                return NotFound();
            }

            // uncomment to unlink image
           /* if (touristPlace.Image != null)
            {
                string removeFilename = touristPlace.Image;
                var path = Path.Combine(_hostingEnvironment.WebRootPath, "Images", removeFilename);

                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
            }*/
            //_context.TouristPlaces.Remove(touristPlace);
            blTouristPlace.DeleteTouristPlace(touristPlace.Id);
            return Ok(touristPlace);
        }
    }
}