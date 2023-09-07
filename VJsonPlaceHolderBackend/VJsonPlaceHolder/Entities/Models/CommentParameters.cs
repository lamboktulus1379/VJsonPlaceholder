namespace Entities.Models
{
    public class CommentParameters : QueryStringParameters
    {
        public CommentParameters()
        {
            OrderBy = "id desc";
        }

        public string Email { get; set; }
    }
}
