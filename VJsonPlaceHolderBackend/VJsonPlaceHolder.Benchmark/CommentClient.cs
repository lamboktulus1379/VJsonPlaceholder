using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace VJsonPlaceHolder.Benchmark
{
    public class CommentClient
    {
        private static readonly HttpClient client = new HttpClient();
        public async Task<Entities.Models.Comment> GetRandomCommentAsync()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return await client.GetFromJsonAsync<Entities.Models.Comment>($"http://localhost:5001/api/Comments/random");
        }
    }

}
