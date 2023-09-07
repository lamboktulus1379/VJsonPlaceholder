using System;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Entities.Models
{
    [Index(nameof(Email), IsDescending = new[] { true })]
    public class Comment : IEntity
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "postId")]
        public string PostId { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }
        [JsonProperty(PropertyName = "body")]
        public string Body { get; set; }
    }
}
