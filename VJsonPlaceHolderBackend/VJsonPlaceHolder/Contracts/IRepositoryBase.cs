﻿using System;
using System.Linq;
using System.Linq.Expressions;
using Entities.Models;

namespace Contracts
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> FindAll();
        IQueryable<T> FindAllWithRelation(Expression<Func<T, Comment>> expression);
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
