using ComeYaAPI.Models.DTOs.ItemDTOs;

namespace ComeYaAPI.Services
{
    public class PaginationService
    {
        public IEnumerable<ReadItemDTO> Paginate(IEnumerable<ReadItemDTO> input, int page, decimal recordPerPage)
        {
            if (page == 0) return input;

            var records = input
                .Skip((page - 1) * ((int)recordPerPage))
                .Take((int)recordPerPage)
                .ToList();

            return records;
        }
    }
}
