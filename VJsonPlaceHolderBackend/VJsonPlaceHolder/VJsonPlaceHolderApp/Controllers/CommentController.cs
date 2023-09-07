using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using VJsonPlaceHolder.Constants;
using VJsonPlaceHolder.Core.DataTransferObjects;
using VJsonPlaceHolder.Filters;
using VJsonPlaceHolder.Services;
using Newtonsoft.Json;

namespace VJsonPlaceHolder.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private LinkGenerator _linkGenerator;
        private readonly ICommentService _commentService;
        private readonly IMemoryCache _memoryCache;
        private readonly ILogger<CommentController> _logger;


        public CommentController(IRepositoryWrapper repository, IMapper mapper, LinkGenerator linkGenerator, ICommentService commentService, IMemoryCache memoryCache, ILogger<CommentController> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _linkGenerator = linkGenerator;
            _commentService = commentService;
            _memoryCache = memoryCache;
            _logger = logger;
        }

        [HttpPost("user")]
        public IActionResult GetUser()
        {
            var email = User.FindFirst(ClaimTypes.Name)?.Value;

            return Ok(email);
        }

        [HttpGet]
        // [ServiceFilter(typeof(ValidateMediaTypeAttribute))]
        public IActionResult GetComments([FromQuery] CommentParameters commentParameters)
        {
            var comments = _commentService.GetExternalComments(commentParameters);

            var list = comments.Result;

            int count = 500;
            int TotalCount = count;
            int PageSize = commentParameters.PageSize;
            int CurrentPage = commentParameters.PageNumber;
            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);
            var metadata = new
            {
                TotalCount = count,
                PageSize = PageSize,
                CurrentPage = CurrentPage,
                TotalPages = TotalPages,
                HasPrevious = CurrentPage > 1,
                HasNext = CurrentPage < TotalPages
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            // _logger.LogInformation($"Returned {comments.TotalCount} comments from database.");

            // var shapedComments = comments.Select(o => o.Entity).ToList();
            // var mediaType = (MediaTypeHeaderValue)HttpContext.Items["AcceptHeaderMediaType"];
            // if (!mediaType.SubTypeWithoutSuffix.EndsWith("hateoas", StringComparison.InvariantCultureIgnoreCase))
            // {
            // return Ok(shapedComments);
            // }
            // for (var index = 0; index < comments.Count; index++)
            // {
            //     var CommentLinks = CreateLinksForComment(comments[index].Id, CommentParameters.Fields);
            //     shapedComments[index].Add("Links", CommentLinks);
            // }
            // var CommentsWrapper = new LinkCollectionWrapper<Entity>(shapedComments);
            return Ok(list);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public IActionResult CreateComment([FromBody] CommentForCreationDto Comment)
        {
            if (Comment == null)
            {
                _logger.LogError("Comment object sent from client is null.");
                return BadRequest("Comment object is null");
            }

            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid Comment object sent from client.");
                return BadRequest("Invalid model object");
            }

            var CommentEntity = _mapper.Map<Comment>(Comment);

            _repository.Comment.CreateComment(CommentEntity);
            _repository.Save();

            var createdComment = _mapper.Map<CommentDto>(CommentEntity);

            return CreatedAtRoute("CommentById", new { id = createdComment.Id }, Comment);
        }

        [HttpGet("{id}", Name = "CommentById")]
        [ServiceFilter(typeof(ValidateMediaTypeAttribute))]
        [Authorize(Roles = "Administrator")]
        public IActionResult GetCommentById(Guid id, [FromQuery] string fields)
        {
            var Comment = _repository.Comment.GetCommentById(id, fields);

            if (Comment.Id == Guid.Empty)
            {
                _logger.LogError($"Comment with id: {id}, hasn't been found in db.");
                return NotFound();
            }

            var mediaType = (MediaTypeHeaderValue)HttpContext.Items["AcceptHeaderMediaType"];

            if (!mediaType.SubTypeWithoutSuffix.EndsWith("hateoas", StringComparison.InvariantCultureIgnoreCase))
            {
                _logger.LogInformation($"Returned shaped Comment with id: {id}");
                return Ok(Comment.Entity);
            }

            Comment.Entity.Add("Links", CreateLinksForComment(Comment.Id, fields));

            return Ok(Comment.Entity);
        }



        [HttpGet("quotes/random")]
        public IActionResult GetCommentRandom()
        {
            var Comment = _repository.Comment.GetRandom();
            return Ok(Comment);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult UpdateComment(Guid id, [FromBody] Comment Comment)
        {
            if (Comment.IsObjectNull())
            {
                _logger.LogError("Comment object sent from client is null.");
                return BadRequest("Comment object is null");
            }

            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid Comment object sent from client.");
                return BadRequest("Invalid model object");
            }

            var dbComment = _repository.Comment.GetCommentById(id);
            if (dbComment.IsEmptyObject())
            {
                _logger.LogError($"Comment with id: {id}, hasn't been found in db.");
                return NotFound();
            }

            _repository.Comment.UpdateComment(dbComment, Comment);
            _repository.Save();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult DeleteComment(Guid id)
        {
            var Comment = _repository.Comment.GetCommentById(id);
            if (Comment.IsEmptyObject())
            {
                _logger.LogError($"Comment with id: {id}, hasn't been found in db.");
                return NotFound();
            }

            _repository.Comment.DeleteComment(Comment);
            _repository.Save();

            return NoContent();
        }

        private IEnumerable<Link> CreateLinksForComment(Guid id, string fields)
        {
            var links = new List<Link>
            {
                new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetCommentById), values: new {id, fields}),
                "self",
                "GET"),

                new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(DeleteComment), values: new {id}),
                "delete_Comment",
                "DELETE"),

                new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(UpdateComment), values: new {id}),
                "update_Comment",
                "PUT")
            };

            return links;
        }

        private LinkCollectionWrapper<Entity> CreateLinksForComments(LinkCollectionWrapper<Entity> categoriesWrapper)
        {
            categoriesWrapper.Links.Add(new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetComments), values: new { }),
                    "self",
                    "GET"));

            return categoriesWrapper;
        }
    }
}
