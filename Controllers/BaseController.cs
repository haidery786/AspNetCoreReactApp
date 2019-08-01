using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AspNetCoreReactSpa.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
  public class BaseController : Controller
  {
    public BaseController()
    {
    }
  }
}
