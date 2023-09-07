using System.Text.Json;
using Entities.DataTransferObjects;
using Entities.Models;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System.Net.Http.Json;


namespace Hosts
{
    public class CommentHost
    {
        private static string BaseUrl = Environment.GetEnvironmentVariable("Comment_HOST");

        private readonly HttpClient _client;

        public CommentHost(HttpClient client)
        {
            _client = client;
            if (BaseUrl == null)
            {
                BaseUrl = "https://jsonplaceholder.typicode.com";
            }
        }

        public async Task<List<Comment>> GetExternalComments(int start, int limit)
        {

            var settingsContent = new JsonSerializerOptions()
            {
                WriteIndented = true,
                DictionaryKeyPolicy = JsonNamingPolicy.CamelCase,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,

            };
            HttpContent httpContent = null;
            var settings = new JsonSerializerSettings()
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy { ProcessDictionaryKeys = true }
                },
                Formatting = Formatting.None,
            };
            settings.Converters.Add(new StringEnumConverter());


            string uri = $"{BaseUrl}/comments?_start={start}&_limit={limit}";

            Dictionary<string, string> headers = new Dictionary<string, string>()
            {

            };

            HttpResponseMessage response = await SendRequest(HttpMethod.Get, uri, httpContent, headers);

            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    return null;
                }
            }
            var res = JsonConvert.DeserializeObject<List<Comment>>(content);


            return res;

        }

        public async Task<HttpResponseMessage> SendRequest(HttpMethod method, string uri, HttpContent httpContent, Dictionary<string, string> headers)
        {
            var httpRequestMessage = new HttpRequestMessage(method, uri);
            httpRequestMessage.Content = httpContent;

            httpRequestMessage.Headers.Clear();
            foreach (var header in headers)
            {
                httpRequestMessage.Headers.Add(header.Key, header.Value);
            }

            var httpResponseMessage = new HttpResponseMessage();
            try
            {
                httpResponseMessage = await _client.SendAsync(httpRequestMessage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return httpResponseMessage;
        }

    }
}
