using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TangeypayCC.Server.Models;

namespace TangeypayCC.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RetrieveContactDetailsController : ControllerBase
    {
        private readonly IMemoryCache _cache;
        private readonly ILogger<RetrieveContactDetailsController> _logger;

        public RetrieveContactDetailsController(ILogger<RetrieveContactDetailsController> logger, IMemoryCache cache)
        {
            _logger = logger;
            _cache = cache;
        }

        [HttpGet(Name = "GetRetrieveContactDetailsController")]
        public Information Post(int id)
        {
            try
            { 
                List<Information> infoList;
                string key = "cacheInfo";

                if (!_cache.TryGetValue<List<Information>>(key, out infoList))
                {
                    throw new InvalidDataException("Information doesn't exist.");
                }

                if (infoList != null && infoList.Count > 0)
                {
                    var existingInfo = infoList.Where(x => x.Id == id);
                    if (existingInfo.Any())
                    {
                        return existingInfo.First(); ;
                    } else
                    {
                        throw new InvalidDataException("Information doesn't exist.");
                    }
                }
                throw new InvalidDataException("Information doesn't exist.");
            }
            catch (Exception ex)
            {
                throw new InvalidDataException(ex.Message);
            }            
        }
    }
}
