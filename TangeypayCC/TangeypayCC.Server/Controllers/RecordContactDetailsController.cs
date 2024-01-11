using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TangeypayCC.Server.Models;

namespace TangeypayCC.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecordContactDetailsController : ControllerBase
    {
        private readonly IMemoryCache _cache;
        private readonly int CacheExpiryInHours = 2;
        private readonly ILogger<RecordContactDetailsController> _logger;

        public RecordContactDetailsController(ILogger<RecordContactDetailsController> logger, IMemoryCache cache)
        {
            _logger = logger;
            _cache = cache;
        }

        [HttpPost(Name = "PostRecordContactDetails")]
        public Information Post([FromBody]Information request)
        {
            List<Information> infoList;
            string key = "cacheInfo";

            if (!_cache.TryGetValue<List<Information>>(key, out infoList)) {
                infoList = new List<Information>();
                //add new information to the new cached list
                request.Id = 1;
                infoList.Add(request);
                _cache.Set<List<Information>>(key, infoList, TimeSpan.FromHours(CacheExpiryInHours));
            }

            if(infoList != null && infoList.Count > 0)
            {
                var existingInfo = infoList.Where(x => x.Name == request.Name && x.PhoneNumber == request.PhoneNumber);
                if(existingInfo.Any())
                {
                    return existingInfo.First();
                } else
                {
                    //add new information to the existing cached list
                    request.Id = infoList.Count + 1;
                    infoList.Add(request);
                    _cache.Set<List<Information>>(key, infoList, TimeSpan.FromHours(CacheExpiryInHours));
                }
            }

            return request;
        }
    }
}
