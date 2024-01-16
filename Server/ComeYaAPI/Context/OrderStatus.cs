using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class OrderStatus
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
