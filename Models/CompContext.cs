using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

#nullable disable

namespace Comp
{
    public partial class CompContext : IdentityDbContext<User>
    {
        public CompContext()
        {
        }

        public CompContext(DbContextOptions<CompContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Industry> Industries { get; set; }
        public virtual DbSet<Sanction> Sanctions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-FGLEVMT\\SQLEXPRESS;Database=Comp;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.IdCompany);

                entity.ToTable("Company");

                entity.Property(e => e.BusinessArea)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsFixedLength(true);

                entity.Property(e => e.NameCompany)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsFixedLength(true);

                entity.Property(e => e.Photo)
                    .HasColumnType("image");

                entity.HasOne(d => d.IdSanctionNavigation)
                    .WithMany(p => p.Companies)
                    .HasForeignKey(d => d.IdSanction)
                    .HasConstraintName("FK_Company_Sanction");
            });

            modelBuilder.Entity<Industry>(entity =>
            {
                entity.HasKey(e => e.IdIndustry);

                entity.ToTable("Industry");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Sanction>(entity =>
            {
                entity.HasKey(e => e.IdSanction);

                entity.ToTable("Sanction");

                entity.Property(e => e.DateSanction).HasColumnType("date");

                entity.Property(e => e.IdIndustry).HasColumnName("idIndustry");

                entity.Property(e => e.SanctionText)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .IsFixedLength(true);

                entity.HasOne(d => d.IdIndustryNavigation)
                    .WithMany(p => p.Sanctions)
                    .HasForeignKey(d => d.IdIndustry)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sanction_Industry");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
