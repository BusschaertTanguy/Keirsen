using System.ComponentModel.DataAnnotations;
using Application.Products.DTO;
using MediatR;

namespace Application.Products.Queries;

public static class GetAllProducts
{
    public sealed class Query : IRequest<List<ProductListDTO>>
    {
        public Query(int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
        }

        [Required(ErrorMessage = "Page index is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Page index should be positive")]
        public int PageIndex { get; }

        [Required(ErrorMessage = "Page size is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Page size should be positive.")]
        public int PageSize { get; }
    }

    internal sealed class Handler : IRequestHandler<Query, List<ProductListDTO>>
    {
        private readonly IProductQueries _productQueries;

        public Handler(IProductQueries productQueries)
        {
            _productQueries = productQueries;
        }

        public Task<List<ProductListDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            return _productQueries.GetAll(request.PageIndex, request.PageSize);
        }
    }
}