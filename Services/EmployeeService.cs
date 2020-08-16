using System.Collections.Generic;
using System.Linq;
using Convertors;
using Models;
using Repositories;

namespace Services {
    public class EmployeeService : IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        IEmployeeConverter _converter;

        public EmployeeService(IEmployeeRepository employeeRepository, IEmployeeConverter converter)
        {
            _employeeRepository = employeeRepository;
            _converter = converter;
        }

        public void Delete(Employee employee)
        {
            _employeeRepository.Delete(_converter.convertToDbModel(employee));
        }

        public List<Employee> GetAll()
        {
        return _converter.convertToModelList(_employeeRepository.GetAllEmployees().ToList());
        }

        public void Update(Employee employee)
        {
            _employeeRepository.Update(_converter.convertToDbModel(employee));
        }

        public ItemLists GetItems() {
            var entityLists = _employeeRepository.GetItems();
            var itemLists = new ItemLists();
            itemLists.Countries = entityLists.Countries.Select(c => new Country() { Id = c.CountryId, Name = c.Name }).ToList();
            itemLists.JobCategories = entityLists.JobCategories.Select(jc => new JobCategory() { Id = jc.JobCategoryId, Title = jc.Title }).ToList();

            return itemLists;
        }
    }
}
