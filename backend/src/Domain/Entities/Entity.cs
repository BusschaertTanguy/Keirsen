using Domain.States;

namespace Domain.Entities;

public abstract class Entity<TState> where TState : BaseState, new()
{
    private protected Entity(TState state)
    {
        State = state;
    }

    private protected Entity(Guid id)
    {
        State = new TState { Id = id };
    }

    internal TState State { get; }

    public Guid Id => State.Id;
}