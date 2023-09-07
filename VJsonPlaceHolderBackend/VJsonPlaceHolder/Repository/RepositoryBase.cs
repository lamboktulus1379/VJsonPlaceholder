using System;
using System.Linq;
using System.Linq.Expressions;
using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected RepositoryContext RepositoryContext { get; set; }
        public RepositoryBase(RepositoryContext repositoryContext)
        {
            this.RepositoryContext = repositoryContext;
        }
        public IQueryable<T> FindAll()
        {
            return this.RepositoryContext.Set<T>().AsNoTracking();
        }
        public IQueryable<T> FindRandom(Expression<Func<T, Guid>> expression)
        {
            return this.RepositoryContext.Set<T>().OrderBy(expression);
        }

        public IQueryable<T> FindRandomQuote(Expression<Func<T, Guid>> expression, Expression<Func<T, bool>> expression1)
        {
            return this.RepositoryContext.Set<T>().OrderBy(expression).Where(expression1);
        }
        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.RepositoryContext.Set<T>().Where(expression).AsNoTracking();
        }

        public IQueryable<T> FindOne()
        {
            return this.RepositoryContext.Set<T>().FromSqlRaw("SELECT TOP (1) * FROM Comments");
        }
        public void Create(T entity)
        {
            this.RepositoryContext.Set<T>().Add(entity);
        }
        public void Update(T entity)
        {
            this.RepositoryContext.Set<T>().Update(entity);
        }
        public void Delete(T entity)
        {
            this.RepositoryContext.Set<T>().Remove(entity);
        }

        public IQueryable<T> FindAllWithRelation(Expression<Func<T, Comment>> expression)
        {
            return this.RepositoryContext.Set<T>().Include(expression).AsNoTracking();
        }
    }
}
