using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class Cart
{
    public int UserId { get; set; }

    public int ItemId { get; set; }

    public int Quantity { get; set; }

    public virtual Item Item { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
