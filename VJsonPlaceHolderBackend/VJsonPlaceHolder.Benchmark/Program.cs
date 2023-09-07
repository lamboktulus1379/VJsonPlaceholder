using BenchmarkDotNet.Running;
using VJsonPlaceHolder.Benchmark;

class Program
{
    static void Main(string[] args)
    {
        BenchmarkRunner.Run<BenchmarkComment>();
        Console.ReadKey();
    }
}
