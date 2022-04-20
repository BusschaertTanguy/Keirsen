namespace Application.Commands;

public interface IUnitOfWork
{
    Task Commit();
}