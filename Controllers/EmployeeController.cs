using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace EmployeesMountFieldTerzievS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
       
        [HttpGet]
        [Route("GetEmployees")]
        public List<Employee> GetEmployees()
        {
            return _employeeService.GetAll();
        }

        [HttpGet]
        [Route("GetItems")]
        public ItemLists GetItems()
        {
            return _employeeService.GetItems();
        }

        [HttpPost]
        [Route("Update")]
        public void Update([FromBody]Employee employee)
        {
            _employeeService.Update(employee);
        }

        [HttpPost]
        [Route("Delete")]
        public void Delete([FromBody]Employee employee)
        {
            _employeeService.Delete(employee);
        }
    }
}
