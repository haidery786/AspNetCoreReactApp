using System.Collections.Generic;
using System.Linq;

namespace AspNetCoreReactSpa.Models
{
  public class EmployeeRepository : IEmployeeRepository
  {

    private readonly AppDbContext _appDbContext;

    public EmployeeRepository(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }
    public IEnumerable<Employee> GetAllEmployees()
    {
      return _appDbContext.Employees;
    }

    public Employee GetEmployeeData(int Id)
    {
      return _appDbContext.Employees.FirstOrDefault(p => p.Id == Id);
    }

    public Employee AddEmployee(Employee employee)
    {
      _appDbContext.Employees.Add(employee);
      _appDbContext.SaveChanges();
      return employee;
    }


    public bool DeleteEmployee(int id)
    {
      Employee employee = _appDbContext.Employees.Find(id);

      if (employee == null)
        return false;

      _appDbContext.Employees.Remove(employee);
      _appDbContext.SaveChanges();
      return true;
    }

    public bool UpdateEmployee(Employee newEmployee)
    {
      Employee existEmployee = _appDbContext.Employees.Find(newEmployee.Id);
      if (newEmployee == null || existEmployee == null)
        return false;

      existEmployee.Name = newEmployee.Name;
      existEmployee.Department = newEmployee.Department;
      existEmployee.City = newEmployee.City;
      existEmployee.Gender = newEmployee.Gender;
      _appDbContext.SaveChanges();
      return true;
    }

  }

}