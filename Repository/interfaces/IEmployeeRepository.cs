using System.Collections.Generic;
using DbModels;

namespace Repositories {
    public interface IEmployeeRepository: IRepository<EmployeeEntity> {
        void Update(EmployeeEntity entity);

        void Delete(EmployeeEntity entity);
        List<EmployeeEntity> GetAllEmployees();

        EntityLists GetItems();
    }
}
