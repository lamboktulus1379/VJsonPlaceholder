using System;
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects
{
    public class TypinForUpdateDto
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Content is required")]
        public string Author { get; set; }
        [Required(ErrorMessage = "Author is required")]
        public string Content { get; set; }
        public string CreatedBy { get; set; }
        [Required(ErrorMessage = "UpdatedBy is required")]
        public string UpdatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        [Required(ErrorMessage = "Updated at is required")]
        public DateTime UpdatedAt { get; set; }
    }
}
