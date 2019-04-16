using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Boilerplate.Web.App.Models
{
    public partial class TALENTContext : DbContext
    {
        public TALENTContext()
        {
        }

        public TALENTContext(DbContextOptions<TALENTContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductSold> ProductSold { get; set; }
        public virtual DbSet<Store> Store { get; set; }
        public virtual ICollection<Dropdown> Dropdown { get; set; }
        public virtual ICollection<SalesData> SalesData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=siva-pc;Database=TALENT;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address).HasColumnName("Address").HasMaxLength(50);

                entity.Property(e => e.Name).HasColumnName("Name").HasMaxLength(50);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Pid);

                entity.Property(e => e.Pid).HasColumnName("PId");

                entity.Property(e => e.Pname)
                    .HasColumnName("PName")
                    .HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<ProductSold>(entity =>
            {
                entity.ToTable("Product_Sold");

                entity.Property(e => e.DateSold).HasColumnType("date");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_Product_Sold_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Product_Sold_Product");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK_Product_Sold_Store");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.HasKey(e => e.Sid);

                entity.Property(e => e.Sid).HasColumnName("SID");

                entity.Property(e => e.Saddress)
                    .HasColumnName("SAddress")
                    .HasMaxLength(50);

                entity.Property(e => e.Sname)
                    .HasColumnName("SName")
                    .HasMaxLength(50);
            });
        }
    }
}
