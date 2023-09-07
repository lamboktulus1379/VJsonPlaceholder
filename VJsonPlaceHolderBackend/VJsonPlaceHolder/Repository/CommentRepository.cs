using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Contracts;
using Entities;
using Entities.Extensions;
using Entities.Helpers;
using Entities.Models;

namespace Repository
{
    public class CommentRepository : RepositoryBase<Comment>, ICommentRepository
    {
        private readonly ISortHelper<Comment> _sortHelper;
        private readonly IDataShaper<Comment> _dataShaper;
        private readonly RepositoryContext _context;

        public CommentRepository(RepositoryContext repositoryContext,
            ISortHelper<Comment> sortHelper,
            IDataShaper<Comment> dataShaper)
            : base(repositoryContext)
        {
            _sortHelper = sortHelper;
            _dataShaper = dataShaper;
            _context = repositoryContext;
        }

        public PagedList<ShapedEntity> GetComments(CommentParameters CommentParameters)
        {
            var Comments = FindAll();

            SearchByName(ref Comments, CommentParameters.Email);

            var sortedComments = _sortHelper.ApplySort(Comments, CommentParameters.OrderBy);
            var shapedComments = _dataShaper.ShapeData(sortedComments, CommentParameters.Fields);

            return PagedList<ShapedEntity>.ToPagedList(shapedComments,
                CommentParameters.PageNumber,
                CommentParameters.PageSize);
        }

        private void SearchByName(ref IQueryable<Comment> Comment, string CommentTitle)
        {
            if (!Comment.Any() || string.IsNullOrWhiteSpace(CommentTitle))
                return;

            if (string.IsNullOrEmpty(CommentTitle))
                return;

            Comment = Comment.Where(o => o.Email.ToLower().Contains(CommentTitle.Trim().ToLower()));
        }

        public ShapedEntity GetCommentById(Guid CommentId, string fields)
        {
            var Comment = FindByCondition(Comment => Comment.Id.Equals(CommentId))
                .FirstOrDefault();

            return _dataShaper.ShapeData(Comment, fields);
        }

        public Comment GetCommentById(Guid CommentId)
        {
            return FindByCondition(Comment => Comment.Id.Equals(CommentId))
                .FirstOrDefault();
        }

        public Comment GetRandom()
        {
            return FindRandom(x => Guid.NewGuid()).First();
        }

        public ShapedEntity GetRandomQuote(string fields)
        {
            var Comment = FindRandomQuote(x => Guid.NewGuid(), t => t.Email.Equals("Quote")).First();

            return _dataShaper.ShapeData(Comment, fields);
        }
        public ShapedEntity GetRandomSpecificQuote(string fields)
        {
            var Comment = FindRandomQuote(x => Guid.NewGuid(), t => t.Email.Equals("Quote") || t.Email.Equals("lamboktulus1379")).FirstOrDefault();

            return _dataShaper.ShapeData(Comment, fields);
        }


        public void CreateComment(Comment Comment)
        {
            Create(Comment);
        }

        public void UpdateComment(Comment dbComment, Comment Comment)
        {
            dbComment.Map(Comment);
            Update(dbComment);
        }

        public void DeleteComment(Comment Comment)
        {
            Delete(Comment);
        }


        public Comment GetOne(Guid id)
        {
            return _context.Comments.FirstOrDefault();
        }
    }
}
