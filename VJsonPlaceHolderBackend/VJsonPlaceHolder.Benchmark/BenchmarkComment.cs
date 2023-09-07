using BenchmarkDotNet.Attributes;

namespace VJsonPlaceHolder.Benchmark
{
    [HtmlExporter]
    public class BenchmarkComment
    {
        [Params(100, 200)]
        public int IterationCount;
        private readonly CommentClient _CommentClient = new CommentClient();

        [Benchmark]
        public async Task GetRandomCommentAsync()
        {
            for (int i = 0; i < IterationCount; i++)
            {
                await _CommentClient.GetRandomCommentAsync();
            }
        }
    }
}
