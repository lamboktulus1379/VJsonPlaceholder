using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Routing;
using Hosts;

namespace VJsonPlaceHolder.Services
{
    public class CommentService : ICommentService
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private LinkGenerator _linkGenerator;
        public CommentService(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper, LinkGenerator linkGenerator)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            _linkGenerator = linkGenerator;
        }
        public Comment Get(Guid id)
        {
            return _repository.Comment.GetOne(id);
        }

        public async Task<List<Comment>> GetExternalComments(CommentParameters commentParameters)
        {
            HttpClient httpClient = new HttpClient();
            CommentHost commentHost = new CommentHost(httpClient);
            var content = await commentHost.GetExternalComments((commentParameters.PageNumber - 1) * commentParameters.PageSize, commentParameters.PageSize);

            return content;
        }
    }
}
