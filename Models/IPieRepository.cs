using System.Collections.Generic;

namespace AspNetCoreReactSpa.Models
{
  public interface IPieRepository
  {
    IEnumerable<Pie> GetAllPies();

    Pie GetPieById(int pieId);

    Pie Add(Pie item);

    bool Remove(int id);

    bool Update(Pie item);

  }
}