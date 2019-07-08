using System.Collections.Generic;
using System.Linq;
using AspNetCoreReactSpa.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreReactSpa.Controllers
{
  [Route("api/[controller]")]
  public class CityController : Controller
  {
    private readonly ICityRepository _cityRepository;

    public CityController(ICityRepository cityRepository)
    {
      _cityRepository = cityRepository;
    }

    [HttpGet]
    public IEnumerable<City> GetCities()
    {
      var cities = _cityRepository.GetCities().OrderBy(e => e.CityName);
      return cities;
    }

  }
}