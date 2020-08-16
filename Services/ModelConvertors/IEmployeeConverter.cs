using System.Collections.Generic;
using DbModels;
using Models;

namespace Convertors {
    public interface IEmployeeConverter {
        EmployeeEntity convertToDbModel(Employee employee);
        Employee convertToModel(EmployeeEntity employee);
        List<Employee> convertToModelList(List<EmployeeEntity> employeeEntityList);
    }
}
