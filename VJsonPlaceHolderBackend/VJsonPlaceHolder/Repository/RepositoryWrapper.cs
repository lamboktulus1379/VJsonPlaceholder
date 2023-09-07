using Contracts;
using Entities;
using Entities.Helpers;
using Entities.Models;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepositoryContext _repoContext;
        private ICommentRepository _comment;

        private readonly ISortHelper<Comment> _commentSortHelper;

        private readonly IDataShaper<Comment> _commentDataShaper;

        public ICommentRepository Comment
        {
            get
            {
                if (_comment == null)
                {
                    _comment = new CommentRepository(_repoContext, _commentSortHelper, _commentDataShaper);
                }
                return _comment;
            }
        }


        public RepositoryWrapper(RepositoryContext repositoryContext,
            ISortHelper<Comment> typingSortHelper,
            IDataShaper<Comment> typingDataShaper
            )
        {
            _repoContext = repositoryContext;
            _commentSortHelper = typingSortHelper;

            _commentDataShaper = typingDataShaper;
        }
        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
