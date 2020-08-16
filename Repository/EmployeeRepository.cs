using System.Collections.Generic;
using System.Linq;
using DbModels;
using Microsoft.EntityFrameworkCore;

namespace Repositories {
    public class EmployeeRepository : Repository<EmployeeEntity>, IEmployeeRepository
    {

        public EmployeeRepository(EmployeeContext context) : base(context)
        {
            
        }

        public void Update(EmployeeEntity updatedEmployee)
        {
            var employeeToUpdate = (_context as EmployeeContext).Employees.FirstOrDefault(empl => empl.EmployeeId == updatedEmployee.EmployeeId);

            if(employeeToUpdate != null) {

                (_context as EmployeeContext).Entry(employeeToUpdate).CurrentValues.SetValues(updatedEmployee);
                _context.SaveChanges();
            }
        }

        public void Delete(EmployeeEntity deletedEmployee)
        {
           var employeeToDelete = (_context as EmployeeContext).Employees.FirstOrDefault(empl => empl.EmployeeId == deletedEmployee.EmployeeId);

           if(employeeToDelete != null) {
                (_context as EmployeeContext).Employees.Remove(employeeToDelete);

                _context.SaveChanges();
            }
        }

        public List<EmployeeEntity> GetAllEmployees() {
            return (_context as EmployeeContext).Employees
            .Include(empl => empl.Country)
            .Include(empl => empl.JobCategory)
            .ToList();
        }

        public EntityLists GetItems() {
            EntityLists entityLists = new EntityLists();

            entityLists.Countries = (_context as EmployeeContext).Countries.ToList();
            entityLists.JobCategories = (_context as EmployeeContext).JobCategories.ToList();

            return entityLists;
        }
    }
}