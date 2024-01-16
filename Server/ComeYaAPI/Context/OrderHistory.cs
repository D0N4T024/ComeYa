using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class OrderHistory
{
    public int OrderId { get; set; }

    public int UserId { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
