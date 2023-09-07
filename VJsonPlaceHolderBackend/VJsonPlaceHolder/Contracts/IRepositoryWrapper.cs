namespace Contracts
{
    public interface IRepositoryWrapper
    {
        ICommentRepository Comment { get; }

        void Save();
    }
}