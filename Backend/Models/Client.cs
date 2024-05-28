using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeWebAPI.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }
        public string? ClientName { get; set; }
        public string? ProjectName { get; set; }
        public string? Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [ForeignKey("EmployeeId")]
        public int EmployeeId { get; set; }
    }
}
