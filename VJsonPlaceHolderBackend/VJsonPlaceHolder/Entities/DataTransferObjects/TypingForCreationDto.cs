using System;
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects
{
    public class CommentForCreationDto
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Author is required")]
        public string Author { get; set; }
        [Required(ErrorMessage = "Content is required")]
        public string Content { get; set; }
        [Required(ErrorMessage = "CreatedBy is required")]
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        [Required(ErrorMessage = "Created at is required")]
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
