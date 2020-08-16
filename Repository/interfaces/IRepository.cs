using System.Collections.Generic;

namespace Repositories {
    public interface IRepository<T> where T: class {
        T Get(int id);
        IEnumerable<T> GetAll();
        
        void Add(T entity);
    }
}
