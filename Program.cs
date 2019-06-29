using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreReactSpa.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AspNetCoreReactSpa
{
  public class Program
  {
    public static void Main(string[] args)
    {
      // CreateWebHostBuilder(args).Build().Run();
      var host = CreateWebHostBuilder(args).Build();

      using (var scope = host.Services.CreateScope())
      {
        var services = scope.ServiceProvider;
        var logger = services.GetRequiredService<ILogger<Program>>();
        try
        {
          logger.LogInformation("Seeding API database");
          var dbInitialiser = services.GetRequiredService<ISeedData>();
          dbInitialiser.Initialise();
        }
        catch (Exception ex)
        {
          logger.LogError("Error creating/seeding API database - " + ex);
        }
      }

      host.Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
               WebHost.CreateDefaultBuilder(args)
                     .ConfigureLogging((hostingContext, logging) =>
                     {
                       logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                       logging.AddConsole();
                       logging.AddDebug();
                       logging.AddEventSourceLogger();
                     })
                     .UseStartup<Startup>();
  }

}
