using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models;

namespace VJsonPlaceHolder.Services
{
    public interface ICommentService
    {
        public Task<List<Comment>> GetExternalComments(CommentParameters commentParameters);
        public Comment Get(Guid id);
    }
}
