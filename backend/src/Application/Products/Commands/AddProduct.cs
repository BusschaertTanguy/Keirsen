using System.ComponentModel.DataAnnotations;
using Application.Commands;
using Domain.Products.Entities;
using Domain.Products.Repositories;
using Domain.Products.ValueObjects;
using MediatR;

namespace Application.Products.Commands;

public static class AddProduct
{
    public sealed class Command : IRequest<Guid>
    {
        public Command(string name, string description)
        {
            Name = name;
            Description = description;
        }

        [Required(ErrorMessage = ProductName.EmptyMessage)]
        [MaxLength(ProductName.MaxLength, ErrorMessage = ProductName.MaxLengthMessage)]
        public string Name { get; }

        [Required(ErrorMessage = ProductDescription.EmptyMessage)]
        [MaxLength(ProductDescription.MaxLength, ErrorMessage = ProductDescription.MaxLengthMessage)]
        public string Description { get; }
    }

    internal sealed class Handler : IRequestHandler<Command, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductRepository _productRepository;

        public Handler(IUnitOfWork unitOfWork, IProductRepository productRepository)
        {
            _unitOfWork = unitOfWork;
            _productRepository = productRepository;
        }

        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            var name = new ProductName(request.Name);
            var description = new ProductDescription(request.Description);
            var product = new Product(name, description);

            await _productRepository.Add(product);
            await _unitOfWork.Commit();

            return product.Id;
        }
    }
}