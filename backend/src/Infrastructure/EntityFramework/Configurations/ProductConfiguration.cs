using Domain.Products.Entities;
using Domain.Products.States;
using Domain.Products.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityFramework.Configurations;

internal sealed class ProductConfiguration : IEntityTypeConfiguration<ProductState>
{
    public void Configure(EntityTypeBuilder<ProductState> builder)
    {
        builder.ToTable(nameof(Product));
        builder.HasKey(product => product.Id);

        builder.Property(product => product.Name)
            .IsRequired()
            .HasMaxLength(ProductName.MaxLength);

        builder.Property(product => product.Description)
            .IsRequired()
            .HasMaxLength(ProductDescription.MaxLength);
    }
}