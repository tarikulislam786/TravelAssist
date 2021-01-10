using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AngApi.DAL.ViewModel
{
    public class TouristPlaceViewModel
    {
        public int Id { get; set; }
       // public string UserId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }

        public IFormFile PhotoFile { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}
