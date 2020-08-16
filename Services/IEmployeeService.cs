using System.Collections.Generic;
using Models;

namespace Services
{
    public interface IEmployeeService
    {
        List<Employee> GetAll();
        void Update(Employee employee);
        void Delete(Employee employee);
        ItemLists GetItems();
    }
}