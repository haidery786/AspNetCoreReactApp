using System.Collections.Generic;
using System.Linq;

namespace AspNetCoreReactSpa.Models
{
  public class PieRepository : IPieRepository
  {

    private readonly AppDbContext _appDbContext;

    public PieRepository(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }
    public IEnumerable<Pie> GetAllPies()
    {
      return _appDbContext.Pies;
    }

    public Pie GetPieById(int pieid)
    {
      return _appDbContext.Pies.FirstOrDefault(p => p.Id == pieid);
    }

    public Pie Add(Pie Pie)
    {
      _appDbContext.Pies.Add(Pie);
      _appDbContext.SaveChanges();
      return Pie;
    }


    public bool Remove(int id)
    {
      Pie Pie = _appDbContext.Pies.Find(id);

      if (Pie == null)
        return false;

      _appDbContext.Pies.Remove(Pie);
      _appDbContext.SaveChanges();
      return true;
    }

    public bool Update(Pie newPie)
    {
      Pie existPie = _appDbContext.Pies.Find(newPie.Id);
      if (newPie == null)
        return false;

      existPie.Name = newPie.Name;
      existPie.ShortDescription = newPie.ShortDescription;
      existPie.Price = newPie.Price;
      existPie.ImageUrl = newPie.ImageUrl;
      existPie.ImageThumbnailUrl = newPie.ImageUrl;


      _appDbContext.SaveChanges();
      return true;
    }

    IEnumerable<Pie> IPieRepository.GetAllPies()
    {
      throw new System.NotImplementedException();
    }
  }

}