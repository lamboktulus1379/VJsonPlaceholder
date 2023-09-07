using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Confluent.Kafka;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace VJsonPlaceHolder
{
    public class KafkaConsumerHandler : IHostedService
    {
        private readonly string topic = "mygra2";
        private readonly IMapper _mapper;
        private readonly IServiceScopeFactory _serviceFactory;

        public KafkaConsumerHandler(IServiceScopeFactory serviceScopeFactory, IMapper mapper)
        {
            _serviceFactory = serviceScopeFactory;
            _mapper = mapper;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            var conf = new ConsumerConfig
            {
                GroupId = "mygra-group",
                BootstrapServers = Environment.GetEnvironmentVariable("KAFKA_SERVER"),
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var builder = new ConsumerBuilder<Ignore,
                string>(conf).Build())
            {
                builder.Subscribe(topic);
                var cancelToken = new CancellationTokenSource();
                try
                {
                    while (true)
                    {
                        var consumer = builder.Consume(cancelToken.Token);
                        Console.WriteLine($"Message: {consumer.Message.Value} received from {consumer.TopicPartitionOffset}");

                        // CommentAnalysisForCreation CommentAnalysis = JsonSerializer.Deserialize<CommentAnalysisForCreation>(consumer.Message.Value);

                        // using (var scope = _serviceFactory.CreateScope())
                        // {
                        //     // TODO: Use CommentAnalysisFactory Instead of creating new instance of dbcontext
                        //     var dbContext = scope.ServiceProvider.GetService<RepositoryContext>();

                        //     var CommentAnalysisEntity = _mapper.Map<CommentAnalysis>(CommentAnalysis);

                        //     dbContext.CommentAnalysis.Add(CommentAnalysisEntity);

                        //     dbContext.SaveChangesAsync();
                        // }
                    }
                }
                catch (Exception)
                {
                    builder.Close();
                }
            }
            return Task.CompletedTask;
        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
