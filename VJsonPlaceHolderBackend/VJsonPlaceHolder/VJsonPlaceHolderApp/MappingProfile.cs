using AutoMapper;
using Entities.DataTransferObjects;
using Entities.Models;
using VJsonPlaceHolder.Core.DataTransferObjects;

namespace AkuSuka
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<Comment, CommentDto>();

            CreateMap<Comment, CommentForUserDto>();
        }
    }
}
