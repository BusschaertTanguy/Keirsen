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

    internal sealed class Handler : CommandHandler<Command>
    {
        private readonly IProductRepository _productRepository;

        public Handler(IUnitOfWork unitOfWork, IProductRepository productRepository) : base(unitOfWork)
        {
            _productRepository = productRepository;
        }

        private protected override async Task Handle(Command command)
        {
            var product = await _productRepository.GetById(command.ProductId);

            product.ChangeInformation(new ProductName(command.Name), new ProductDescription(command.Description));
        }
    }
}