using System;
using Newtonsoft.Json;

namespace Entities
{
    public interface IEntity
    {
        [JsonProperty(PropertyName = "id")]
        int Id { get; set; }
    }
}