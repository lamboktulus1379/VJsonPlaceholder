using Newtonsoft.Json;

namespace Entities.DataTransferObjects
{
    public class CommentDto
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "postId")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }
        [JsonProperty(PropertyName = "body")]
        public string Body { get; set; }
    }
}
