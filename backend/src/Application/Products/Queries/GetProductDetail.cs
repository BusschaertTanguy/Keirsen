using System.ComponentModel.DataAnnotations;
using Application.Products.DTO;
using MediatR;

namespace Application.Products.Queries;

public static class GetProductDetail
{
    public sealed class Query : IRequest<ProductDetailDTO?>
    {
        public Query(Guid id)
        {
            Id = id;
        }

        [Required(ErrorMessage = "Product id is required.")]
        public Guid Id { get; }
    }

    internal sealed class Handler : IRequestHandler<Query, ProductDetailDTO?>
    {
        private readonly IProductQueries _productQueries;

        public Handler(IProductQueries productQueries)
        {
            _productQueries = productQueries;
        }

        public Task<ProductDetailDTO?> Handle(Query request, CancellationToken cancellationToken)
        {
            return _productQueries.GetById(request.Id);
        }
    }
}