using System.Net;
using Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Presentation.Filters;

internal sealed class ExceptionActionFilter : IActionFilter, IOrderedFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            context.Result = new BadRequestObjectResult(context.ModelState);
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Exception == null)
        {
            return;
        }

        switch (context.Exception)
        {
            case DomainException domainException:
                context.ModelState.AddModelError(domainException.Key, domainException.Message);
                context.Result = new BadRequestObjectResult(context.ModelState);
                context.ExceptionHandled = true;
                return;
            default:
                context.Result = new ObjectResult(new { }) { StatusCode = (int)HttpStatusCode.InternalServerError };
                context.ExceptionHandled = true;
                return;
        }
    }

    public int Order => int.MaxValue - 10;
}