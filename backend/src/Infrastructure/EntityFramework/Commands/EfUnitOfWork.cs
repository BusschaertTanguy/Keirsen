using Application.Commands;

namespace Infrastructure.EntityFramework.Commands;

internal class EfUnitOfWork : IUnitOfWork
{
    private readonly KeirsenDbContext _context;

    public EfUnitOfWork(KeirsenDbContext context)
    {
        _context = context;
    }

    public Task Commit()
    {
        return _context.SaveChangesAsync();
    }
}