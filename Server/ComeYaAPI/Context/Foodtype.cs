using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class Foodtype
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<Food> Foods { get; set; } = new List<Food>();
}
