using System;

namespace DbModels
{
    public class EmployeeEntity
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public int Gender { get; set; }
        public int JobCategoryId { get; set; }
        public JobCategoryEntity JobCategory { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int CountryId { get; set; }
        public CountryEntity Country { get; set; }
        public DateTime JoinedDate { get; set; }
        public DateTime? ExitedDate { get; set; }
    }
}