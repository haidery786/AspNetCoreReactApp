using System.Collections.Generic;

namespace AspNetCoreReactSpa.Models
{
  public interface IEmployeeRepository
  {
    IEnumerable<Employee> GetAllEmployees();

    Employee GetEmployeeData(int Id);

    Employee AddEmployee(Employee item);

    bool DeleteEmployee(int id);

    bool UpdateEmployee(Employee item);

  }
}