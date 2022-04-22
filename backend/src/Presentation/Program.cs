using Application.Extensions;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;
using Presentation.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureInfrastructureLayer(builder.Configuration);
builder.Services.ConfigureApplicationLayer();
builder.Services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

builder.Services.AddCors(options => options
    .AddPolicy("All", policy => policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
    )
);

builder.Services.AddControllers(options => { options.Filters.Add<ExceptionActionFilter>(); });
builder.Services.AddRazorPages();

var app = builder.Build();

app.UseCors("All");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllers();
app.MapRazorPages();

app.Run();