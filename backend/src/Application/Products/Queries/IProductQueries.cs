using Application.Products.DTO;

namespace Application.Products.Queries;

public interface IProductQueries
{
    Task<List<ProductListDTO>> GetAll(int pageIndex, int pageSize);
    Task<ProductDetailDTO?> GetById(Guid id);
}