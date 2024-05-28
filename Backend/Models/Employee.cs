using System.ComponentModel.DataAnnotations;

namespace EmployeeWebAPI.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public string? Designation { get; set; }
        public string? Deparatment { get; set; }

        public virtual IList<string?>? Comments { get; set; }
    }
}
