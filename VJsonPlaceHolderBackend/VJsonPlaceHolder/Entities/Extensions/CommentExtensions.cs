using Entities.Models;

namespace Entities.Extensions
{
    public static class CommentExtensions
    {
        public static void Map(this Comment dbComment, Comment Comment)
        {
            dbComment.Id = dbComment.Id;
            dbComment.Name = dbComment.Name;
            dbComment.Email = dbComment.Email;
            dbComment.Body = dbComment.Body;
        }
    }
}
