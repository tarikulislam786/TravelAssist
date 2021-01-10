using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AngApi.DAL.Model
{
    public class TouristPlace
    {
        [Key]
        public int Id { get; set; }
        //[Required]
        //[Column(TypeName = "nvarchar(450)")]
        //public string UserId { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Title { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Image { get; set; }
        // public IFormFile Photo { get; set; }

        [Column(TypeName = "nvarchar(300)")]
        public string Description { get; set; }
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string CreatedBy { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string ModifiedBy { get; set; }

    }
}
