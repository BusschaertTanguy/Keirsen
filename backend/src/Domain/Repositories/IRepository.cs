using Domain.Entities;
using Domain.States;

namespace Domain.Repositories;

public interface IRepository<TRootEntity, TState> where TRootEntity : RootEntity<TState> where TState : BaseState, new()
{
    Task<TRootEntity> GetById(Guid id);
    Task Add(TRootEntity rootEntity);
}