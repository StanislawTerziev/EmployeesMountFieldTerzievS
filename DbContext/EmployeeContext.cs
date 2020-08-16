using Microsoft.EntityFrameworkCore;
using DbModels;

public class EmployeeContext : DbContext
{
    public EmployeeContext()
    {
  
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Filename=C:/Users/Development/Desktop/SQLite/DBs/MoutfieldEmployees/EmployeeDB.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<JobCategoryEntity>().ToTable("JobCategory").HasKey(jc => jc.JobCategoryId);
        modelBuilder.Entity<CountryEntity>().ToTable("Country").HasKey(country => country.CountryId);
        modelBuilder.Entity<EmployeeEntity>().ToTable("Employee").HasKey(empl => empl.EmployeeId);
    }

    // entities
    public DbSet<EmployeeEntity> Employees { get; set; }
    public DbSet<JobCategoryEntity> JobCategories { get; set; }
    public DbSet<CountryEntity> Countries { get; set; }
} 