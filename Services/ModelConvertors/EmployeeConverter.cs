using System.Collections.Generic;
using DbModels;
using Models;

namespace Convertors {
    public class EmployeeConverter : IEmployeeConverter
    {
        public EmployeeEntity convertToDbModel(Employee employee)
        {
            return new EmployeeEntity()
            {
                EmployeeId = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                BirthDate = employee.BirthDate,
                Gender = (int)employee.Gender,
                JobCategory = new JobCategoryEntity()
                {
                    JobCategoryId = employee.JobCategory.Id,
                    Title = employee.JobCategory.Title
                },
                JobCategoryId = employee.JobCategory.Id,
                Email = employee.Email,
                PhoneNumber = employee.PhoneNumber,
                CountryId = employee.Country.Id,
                Country = new CountryEntity()
                {
                    CountryId = employee.Country.Id,
                    Name = employee.Country.Name
                },
                JoinedDate = employee.JoinedDate,
                ExitedDate = employee.ExitedDate
            };
        }

        public Employee convertToModel(EmployeeEntity employeeEntity)
        {
            return new Employee()
            {
                Id = employeeEntity.EmployeeId,
                FirstName = employeeEntity.FirstName,
                LastName = employeeEntity.LastName,
                BirthDate = employeeEntity.BirthDate,
                Gender = (Gender)employeeEntity.Gender,
                JobCategory = new JobCategory()
                {
                    Id = employeeEntity.JobCategory.JobCategoryId,
                    Title = employeeEntity.JobCategory.Title
                },
                Email = employeeEntity.Email,
                PhoneNumber = employeeEntity.PhoneNumber,
                Country = new Country()
                {
                    Id = employeeEntity.Country.CountryId,
                    Name = employeeEntity.Country.Name
                },
                JoinedDate = employeeEntity.JoinedDate,
                ExitedDate = employeeEntity.ExitedDate
            };
        }

        public List<Employee> convertToModelList(List<EmployeeEntity> employeeEntityList) {
            return employeeEntityList.ConvertAll(entity => convertToModel(entity));
        }
    }
}
