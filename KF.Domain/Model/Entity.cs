using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Specialized;

namespace KF.Domain.Model
{
    public abstract class Entity
    {
        public abstract void Initialize(Dictionary<string,string> filter);
    
        public string Serialize()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class Entities
    {
        private HashSet<Entity> Values = new HashSet<Entity>();

        public void Add(Entity entity)
        {
            Values.Add(entity);
        }

        public string Serialize()
        {
            return JsonConvert.SerializeObject(Values);
        }
    }
}
