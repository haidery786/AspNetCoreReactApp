using System.Collections.Generic;
using System.Linq;

namespace AspNetCoreReactSpa.Models
{
  public class CityRepository : ICityRepository
  {
    private readonly AppDbContext _appDbContext;

    public CityRepository(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }

    public IEnumerable<City> GetCities()
    {
      var cities = _appDbContext.Cities;

      return cities;

    }


  }
}