using MediatR;

namespace Application.Commands;

internal abstract class CommandHandler<TCommand> : IRequestHandler<TCommand> where TCommand : IRequest
{
    private readonly IUnitOfWork _unitOfWork;

    private protected CommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Unit> Handle(TCommand request, CancellationToken cancellationToken)
    {
        await Handle(request);
        await _unitOfWork.Commit();

        return Unit.Value;
    }

    private protected abstract Task Handle(TCommand command);
}

internal abstract class CommandHandler<TCommand, TResponse> : IRequestHandler<TCommand, TResponse> where TCommand : IRequest<TResponse>
{
    private readonly IUnitOfWork _unitOfWork;

    private protected CommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<TResponse> Handle(TCommand request, CancellationToken cancellationToken)
    {
        var response = await Handle(request);
        await _unitOfWork.Commit();

        return response;
    }

    private protected abstract Task<TResponse> Handle(TCommand command);
}