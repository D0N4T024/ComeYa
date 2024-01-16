using System;
using System.Collections.Generic;

namespace ComeYaAPI.Context;

public partial class UserStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
