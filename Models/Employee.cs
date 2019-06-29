using AspNetCoreReactSpa.Enums;

namespace AspNetCoreReactSpa.Models
{
  public class Employee
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string City { get; set; }
    public string Department { get; set; }
    public Gender Gender { get; set; }
  }

}