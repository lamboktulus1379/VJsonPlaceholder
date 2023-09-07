using System;
using Entities.Models;

namespace Contracts
{
    public interface ICommentRepository : IRepositoryBase<Comment>
    {
        PagedList<ShapedEntity> GetComments(CommentParameters CommentParameters);
        ShapedEntity GetCommentById(Guid CommentId, string fields);
        Comment GetCommentById(Guid CommentId);
        Comment GetRandom();
        ShapedEntity GetRandomQuote(string fields);
        ShapedEntity GetRandomSpecificQuote(string fields);
        void CreateComment(Comment Comment);
        void UpdateComment(Comment dbComment, Comment Comment);
        void DeleteComment(Comment Comment);
        Comment GetOne(Guid id);
    }
}
