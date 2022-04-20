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

    internal sealed class Handler : CommandHandler<Command, Guid>
    {
        private readonly IProductRepository _productRepository;

        public Handler(IUnitOfWork unitOfWork, IProductRepository productRepository) : base(unitOfWork)
        {
            _productRepository = productRepository;
        }

        private protected override async Task<Guid> Handle(Command command)
        {
            var product = new Product(new ProductName(command.Name), new ProductDescription(command.Description));

            await _productRepository.Add(product);

            return product.Id;
        }
    }
}