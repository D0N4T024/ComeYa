using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class Food
{
    public int Id { get; set; }

    public int? FoodTypeId { get; set; }

    public int? CategoryTypeId { get; set; }

    public virtual Categorytype? CategoryType { get; set; }

    public virtual Foodtype? FoodType { get; set; }

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();
}
