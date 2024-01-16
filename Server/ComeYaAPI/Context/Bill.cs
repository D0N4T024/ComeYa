using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class Bill
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public DateTime CreatedAt { get; set; }

    public int UserId { get; set; }

    public decimal Taxes { get; set; }

    public decimal Balance { get; set; }

    public string BillCode { get; set; } = null!;

    public string Url { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
