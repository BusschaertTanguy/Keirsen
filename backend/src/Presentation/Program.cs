using Application.Extensions;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;
using Presentation.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureInfrastructureLayer(builder.Configuration);
builder.Services.ConfigureApplicationLayer();
builder.Services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);
builder.Services.AddControllers(options => { options.Filters.Add<ExceptionActionFilter>(); });

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();