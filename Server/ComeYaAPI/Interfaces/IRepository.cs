using System.Linq.Expressions;

namespace ComeYa.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        // GET
        Task<TEntity?> GetByIdAsync(int id);
        Task<IEnumerable<TEntity>> GetAllAsync();

        Task<IEnumerable<TEntity>> GetAllIncluding<TEntity>(Expression<Func<TEntity, bool>>? expression,
        params Expression<Func<TEntity, object>>[] includeProperties) where TEntity : class;
        Task<TEntity> FindAsync(Expression<Func<TEntity, bool>> expression);
        IEnumerable<TEntity> GetAllRandom(IEnumerable<TEntity> entities);
        Task<TEntity> FindIncluding<TEntity>(Expression<Func<TEntity, bool>>? expression,
        params Expression<Func<TEntity, object>>[] includeProperties) where TEntity : class;

        IEnumerable<TEntity> Filter(IEnumerable<TEntity> entities, List<Func<TEntity, bool>> filters);
        IEnumerable<TEntity> Paginate(IEnumerable<TEntity> entities, int page, decimal recordPerPage);

        Task<IEnumerable<TEntity>?> FindAllAsync(Expression<Func<TEntity, bool>> expression);

        // POST
        Task AddAsync(TEntity entity);
        void Add(TEntity entity);
        Task<IEnumerable<TEntity>> AddRangeAsync(IEnumerable<TEntity> entities);

        // PUT
        Task Update(TEntity entity);

        // DELETE 
        void Delete(TEntity entity);
        void DeleteRange(IEnumerable<TEntity> entities);

        
    }
}
