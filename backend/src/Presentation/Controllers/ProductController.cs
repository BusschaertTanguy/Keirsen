using Application.Products.Commands;
using Application.Products.DTO;
using Application.Products.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Guid>> Add([FromServices] IMediator mediator, [FromBody] AddProduct.Command command)
    {
        var id = await mediator.Send(command);

        return CreatedAtAction(nameof(GetById), new { id }, null);
    }

    [Authorize]
    [HttpPost("change-information")]
    public async Task<IActionResult> ChangeInformation([FromServices] IMediator mediator, [FromBody] ChangeProductInformation.Command command)
    {
        await mediator.Send(command);

        return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductListDTO>>> GetAll([FromServices] IMediator mediator, int pageIndex, int pageSize)
    {
        var products = await mediator.Send(new GetAllProducts.Query(pageIndex, pageSize));

        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDetailDTO>> GetById([FromServices] IMediator mediator, Guid id)
    {
        var product = await mediator.Send(new GetProductDetail.Query(id));

        return Ok(product);
    }
}