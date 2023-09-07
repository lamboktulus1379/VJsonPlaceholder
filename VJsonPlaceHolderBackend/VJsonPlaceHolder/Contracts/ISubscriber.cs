using System.Threading.Tasks;

namespace Contracts
{
    public interface ISubscriber
    {
        Task pullMessageAsync();
    }
}
