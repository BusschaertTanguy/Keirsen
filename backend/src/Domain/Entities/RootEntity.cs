using Domain.States;

namespace Domain.Entities;

public abstract class RootEntity<TState> : Entity<TState> where TState : BaseState, new()
{
    private protected RootEntity(TState state) : base(state)
    {
    }

    private protected RootEntity(Guid id) : base(id)
    {
    }
}