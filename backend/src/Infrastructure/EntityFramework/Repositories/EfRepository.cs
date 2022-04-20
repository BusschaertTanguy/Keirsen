using Domain.Entities;
using Domain.Exceptions;
using Domain.Repositories;
using Domain.States;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityFramework.Repositories;

internal abstract class EfRepository<TRootEntity, TState> : IRepository<TRootEntity, TState> where TRootEntity : RootEntity<TState> where TState : BaseState, new()
{
    private readonly KeirsenDbContext _context;

    private protected EfRepository(KeirsenDbContext context)
    {
        _context = context;
    }

    public async Task<TRootEntity> GetById(Guid id)
    {
        var state = await _context.Set<TState>()
            .FirstOrDefaultAsync(state => state.Id == id);

        if (state == null)
        {
            throw new DomainException($"{typeof(TRootEntity).Name} not found.");
        }

        return ToEntity(state);
    }

    public Task Add(TRootEntity rootEntity)
    {
        return _context.Set<TState>()
            .AddAsync(rootEntity.State)
            .AsTask();
    }

    private protected abstract TRootEntity ToEntity(TState state);
}