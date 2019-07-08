using System.Collections.Generic;

namespace AspNetCoreReactSpa.Models
{
  public interface ICityRepository
  {
    IEnumerable<City> GetCities();
  }

}
