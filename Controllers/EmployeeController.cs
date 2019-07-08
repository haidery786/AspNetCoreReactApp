using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreReactSpa.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreReactSpa.Controllers
{
  [Route("api/[controller]")]
  public class EmployeeController : Controller
  {
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeController(IEmployeeRepository employeeRepository)
    {
      _employeeRepository = employeeRepository;
    }

    [HttpGet]
    public IEnumerable<Employee> GetAllEmployees()
    {
      var employees = _employeeRepository.GetAllEmployees().OrderBy(e => e.Name);
      return employees;
    }

    [HttpGet("{id}")]
    public IActionResult GetEmployeeDataById(int id)
    {
      var employee = _employeeRepository.GetEmployeeData(id);
      if (employee != null)
        return new ObjectResult(employee);
      else
        return NotFound();
    }

    [HttpPost]
    public IActionResult Post([FromBody]Employee employee)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      Employee newEmployee = _employeeRepository.AddEmployee(employee);

      if (newEmployee == null)
      {
        return BadRequest("New pie is Null");
      }
      else
      {
        return new ObjectResult(employee);
      }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEmployee(int id)
    {
      var employee = _employeeRepository.GetEmployeeData(id);
      if (employee != null)
      {
        _employeeRepository.DeleteEmployee(id);
        return Ok(employee);
      }
      else
        return BadRequest("Employee is not deleted");
    }

    // PUT: api/employee/5
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody]Employee emp)
    {
      if (emp == null)
      {
        return BadRequest();
      }
      if (!_employeeRepository.UpdateEmployee(emp))
      {
        return BadRequest();
      }
      else
      {
        var upd_emp = _employeeRepository.GetEmployeeData(emp.Id);
        if (upd_emp == null)
          return NotFound();
        return new ObjectResult(upd_emp);
      }
    }
  }

}