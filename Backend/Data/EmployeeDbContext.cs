using EmployeeWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeWebAPI.Data
{
    public class EmployeeDbContext : DbContext

    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {

        }

        //DbSet
        public DbSet<Client> Clients { get; set; }
        public DbSet<Employee> Employees { get; set; }
    }
}
