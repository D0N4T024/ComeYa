using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class Item
{
    public int Id { get; set; }

    public int FoodId { get; set; }

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public string Image { get; set; } = null!;

    public int RestaurantId { get; set; }

    public ulong Combo { get; set; }

    public string Name { get; set; } = null!;

    public string? MarketingImg1 { get; set; }

    public string? MarketingImg2 { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Food? Food { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Restaurant Restaurant { get; set; } = null!;
}
