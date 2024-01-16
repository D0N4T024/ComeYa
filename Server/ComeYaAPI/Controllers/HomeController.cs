using AutoMapper;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.ItemDTOs;
using ComeYaAPI.Models.DTOs.RestaurantDTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.FileIO;

namespace ComeYaAPI.Controllers
{
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("ComeYa/[controller]")]
    public class HomeController : Controller
    {
        private readonly ComeyaContext _context;
        private readonly IMapper _mapper;
        public HomeController(ComeyaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;


        }

        [HttpPost]
        public IActionResult Index()
        {
            using (var parser = new TextFieldParser("C:\\Users\\mario\\Documents\\Restaurant.csv"))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData)
                {
                    var fields = parser.ReadFields();
                    var model = new CreateRestaurantDTO
                    {
                        Name = fields[0],
                        Logo = fields[1],
                        Description = fields[2],
                        Rating = decimal.Parse(fields[3]),
                        Background = fields[4],
                        MarketingImg = fields[5],
                       
                        // Mapear otros campos según sea necesario
                    };
                    var item = _mapper.Map<Restaurant>(model);
                    _context.Add(item);

                    // Trabajar con el modelo
                }
            }
            _context.SaveChanges();
            return Ok();
        }
    }
}
