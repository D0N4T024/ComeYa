using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.ItemDTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI;
using Nest;

namespace ComeYaAPI.Controllers
{
    [Route("ComeYa/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IElasticClient _elasticClient;
        private readonly IConfiguration _configuration;
        
        public ItemsController(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _configuration = configuration;


            var settings = new ConnectionSettings(new Uri("http://localhost:9200"))

                .DefaultIndex("items");
               // .BasicAuthentication("elastic", "elastic");

            var client = new ElasticClient(settings);
            
            
            _unitOfWork = unitOfWork;
            _elasticClient =client;
        }

        // Metodo Get para mostrar todos los items
        [HttpGet("AllItems")]
        
        public async Task<ActionResult<IEnumerable<ReadItemDTO>>> GetAllItems(string? type, string? category,decimal price= 0M, int page=0, ulong combo=2, int restaurant=0, int rand =0 )
        {
           
            var items = await _unitOfWork.Items.GetAllItems(type,category,price,page,combo,restaurant,rand);
            foreach (var item in items.Entity)
            {
                var indexResponse = await _elasticClient.CreateDocumentAsync(item);
                if (!indexResponse.IsValid)
                {
                    return StatusCode(500, "Error al indexar los elementos en Elasticsearch.");

                }
            }

            _unitOfWork.Dispose();

            return Ok(items.Entity);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReadItemDTO>> GetById(int id)
        {
            var item = await _unitOfWork.Items.GetItemById(id);
            _unitOfWork.Dispose();

            return Ok(item.Entity);
        }

        [HttpGet("Search")]
        public  ActionResult<IEnumerable<Item>> Buscar(string termino)
        {
    

            var response = _elasticClient.Search<ReadItemDTO>(s => s
     .Query(q => q
         .Bool(b => b
             .Should(sh => sh
                 .MultiMatch(m => m 
                     .Fields(f => f
                         .Field(ff => ff.Description)
                     )
                     .Query(termino)
                     .Fuzziness(Fuzziness.Auto)
                 ),
                 sh => sh
                 .MultiMatch(m => m
                     .Fields(f => f
                         .Field(ff => ff.Name)
                     )
                     .Query(termino)
                     .Fuzziness(Fuzziness.Auto)
                 ),
                 sh => sh
                 .MultiMatch(m => m
                     .Fields(f => f
                         .Field(ff => ff.Food)
                     )
                     .Query(termino)
                     .Fuzziness(Fuzziness.Auto)
                 ),
                 sh => sh
                 .MultiMatch(m => m
                     .Fields(f => f
                         .Field(ff => ff.Category)
                     )
                     .Query(termino)
                     .Fuzziness(Fuzziness.Auto)
                 )
                 // Agrega más bloques MultiMatch para otros campos si es necesario
             )
         )
     )
     .Size(100));

            var result = _elasticClient.Search<ReadItemDTO>(s => s.Query
            (q => q.QueryString(d => d
            .Query($"*{termino}*"))).Size(40));
            
            if (response.Documents.Count != 0)
            {
                var resultados = response.Documents;
                return Ok(resultados.ToList());
            }
            

            if (result.Documents.Count != 0)
            {
                var resultados = result.Documents;
                return Ok(resultados.ToList());
            }
            else
            {
                // Manejar errores si es necesario
                return BadRequest("No se encontraron articulos");
            }
            
        }
    }
    // Metodo Get para mostrar los combos (filtro: Precio, FoodType, Restaurante)
    // Metodo Get por tipo de comida (Hambuerguesa, Pizza, ...)(filtro: Precio, FoodType, Restaurante)
    // Metodo Get por categoria de comida (Si es Vegana o no) (filtro: Precio, FoodType, Restaurante)
    // Metodo Get por restaurante 
}

