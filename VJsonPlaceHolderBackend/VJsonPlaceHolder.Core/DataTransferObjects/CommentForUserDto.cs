using System.Text.Json.Serialization;

namespace VJsonPlaceHolder.Core.DataTransferObjects
{
    public class CommentForUserDto
    {
        public Guid Id { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
    }
}
