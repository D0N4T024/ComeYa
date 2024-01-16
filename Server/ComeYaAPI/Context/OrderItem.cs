using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class OrderItem
{
    public int OrderId { get; set; }

    public int ItemId { get; set; }

    public decimal Amount { get; set; }

    public int Quantity { get; set; }

    public decimal Taxes { get; set; }

    public virtual Item Item { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
