using System.ComponentModel.DataAnnotations;
using Application.Commands;
using Domain.Products.Repositories;
using Domain.Products.ValueObjects;
using MediatR;

namespace Application.Products.Commands;

public static class ChangeProductInformation
{
    public sealed class Command : IRequest
    {
        public Command(Guid productId, string name, string description)
        {
            ProductId = productId;
            Name = name;
            Description = description;
        }

        [Required]
        public Guid ProductId { get; }

        [Required(ErrorMessage = ProductName.EmptyMessage)]
        [MaxLength(ProductName.MaxLength, ErrorMessage = ProductName.MaxLengthMessage)]
        public string Name { get; }

        [Required(ErrorMessage = ProductDescription.EmptyMessage)]
        [MaxLength(ProductDescription.MaxLength, ErrorMessage = ProductDescription.MaxLengthMessage)]
        public string Description { get; }
    }

    internal sealed class Handler : IRequestHandler<Command>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductRepository _productRepository;

        public Handler(IUnitOfWork unitOfWork, IProductRepository productRepository)
        {
            _unitOfWork = unitOfWork;
            _productRepository = productRepository;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetById(request.ProductId);
            var name = new ProductName(request.Name);
            var description = new ProductDescription(request.Description);

            product.ChangeInformation(name, description);
            await _unitOfWork.Commit();

            return Unit.Value;
        }
    }
}