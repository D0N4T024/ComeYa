using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ComeYaAPI.Context;

public partial class ComeyaContext : DbContext
{
    public ComeyaContext()
    {
    }

    public ComeyaContext(DbContextOptions<ComeyaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Categorytype> Categorytypes { get; set; }

    public virtual DbSet<Food> Foods { get; set; }

    public virtual DbSet<Foodtype> Foodtypes { get; set; }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderHistory> OrderHistories { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<OrderStatus> OrderStatuses { get; set; }

    public virtual DbSet<Restaurant> Restaurants { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserStatus> UserStatuses { get; set; }

   
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ItemId }).HasName("PRIMARY");

            entity.ToTable("cart");

            entity.HasIndex(e => e.ItemId, "Item_Id");

            entity.Property(e => e.UserId).HasColumnName("User_Id");
            entity.Property(e => e.ItemId).HasColumnName("Item_Id");
            entity.Property(e => e.Quantity).HasDefaultValueSql("'1'");

            entity.HasOne(d => d.Item).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cart_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cart_ibfk_2");
        });

        modelBuilder.Entity<Categorytype>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("categorytype");

            entity.Property(e => e.Description).HasMaxLength(150);
        });

        modelBuilder.Entity<Food>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("food");

            entity.HasIndex(e => e.CategoryTypeId, "CategoryType_Id");

            entity.HasIndex(e => e.FoodTypeId, "FoodType_Id");

            entity.Property(e => e.CategoryTypeId).HasColumnName("CategoryType_Id");
            entity.Property(e => e.FoodTypeId).HasColumnName("FoodType_Id");

            entity.HasOne(d => d.CategoryType).WithMany(p => p.Foods)
                .HasForeignKey(d => d.CategoryTypeId)
                .HasConstraintName("food_ibfk_2");

            entity.HasOne(d => d.FoodType).WithMany(p => p.Foods)
                .HasForeignKey(d => d.FoodTypeId)
                .HasConstraintName("food_ibfk_1");
        });

        modelBuilder.Entity<Foodtype>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("foodtype");

            entity.Property(e => e.Description).HasMaxLength(150);
        });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("item");

            entity.HasIndex(e => e.FoodId, "Food_Id");

            entity.HasIndex(e => e.RestaurantId, "Restaurant_Id");

            entity.Property(e => e.Combo).HasColumnType("bit(1)");
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.FoodId).HasColumnName("Food_Id");
            entity.Property(e => e.Image).HasMaxLength(1000);
            entity.Property(e => e.MarketingImg1).HasMaxLength(200);
            entity.Property(e => e.MarketingImg2).HasMaxLength(200);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Price).HasPrecision(12, 3);
            entity.Property(e => e.RestaurantId).HasColumnName("Restaurant_Id");

            entity.HasOne(d => d.Food).WithMany(p => p.Items)
                .HasForeignKey(d => d.FoodId)
                .HasConstraintName("item_ibfk_1");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.Items)
                .HasForeignKey(d => d.RestaurantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("item_ibfk_2");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("order");

            entity.HasIndex(e => e.OrderCode, "Order_Code").IsUnique();

            entity.HasIndex(e => e.OrderStatusId, "Order_Status_Id");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("Created_At");
            entity.Property(e => e.OrderCode)
                .HasMaxLength(50)
                .HasColumnName("Order_Code");
            entity.Property(e => e.OrderStatusId)
                .HasDefaultValueSql("'1'")
                .HasColumnName("Order_Status_Id");
            entity.Property(e => e.Receipt).HasColumnType("text");

            entity.HasOne(d => d.OrderStatus).WithMany(p => p.Orders)
                .HasForeignKey(d => d.OrderStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_ibfk_1");
        });

        modelBuilder.Entity<OrderHistory>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.OrderId }).HasName("PRIMARY");

            entity.ToTable("order_history");

            entity.HasIndex(e => e.OrderId, "Order_Id_UNIQUE").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("User_Id");
            entity.Property(e => e.OrderId).HasColumnName("Order_Id");

            entity.HasOne(d => d.Order).WithOne(p => p.OrderHistory)
                .HasForeignKey<OrderHistory>(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_history_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.OrderHistories)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_history_ibfk_2");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => new { e.OrderId, e.ItemId }).HasName("PRIMARY");

            entity.ToTable("order_item");

            entity.HasIndex(e => e.ItemId, "Item_Id");

            entity.Property(e => e.OrderId).HasColumnName("Order_Id");
            entity.Property(e => e.ItemId).HasColumnName("Item_Id");
            entity.Property(e => e.Amount).HasPrecision(15);
            entity.Property(e => e.Taxes).HasPrecision(15);

            entity.HasOne(d => d.Item).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_item_ibfk_2");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_item_ibfk_1");
        });

        modelBuilder.Entity<OrderStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("order_status");

            entity.Property(e => e.Description).HasMaxLength(50);
        });

        modelBuilder.Entity<Restaurant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("restaurant");

            entity.Property(e => e.Background).HasMaxLength(500);
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Logo).HasMaxLength(500);
            entity.Property(e => e.MarketingImg).HasMaxLength(200);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Rating).HasPrecision(2, 1);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.ActivationCode, "ActivationCode_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Email, "UQ_Email_Unique").IsUnique();

            entity.HasIndex(e => e.StatusId, "user_ibfk_1");

            entity.Property(e => e.ActivationCode).HasMaxLength(10);
            entity.Property(e => e.Balance)
                .HasPrecision(14, 3)
                .HasDefaultValueSql("'100.000'");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("Created_At");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Genre).HasMaxLength(20);
            entity.Property(e => e.Lname).HasMaxLength(200);
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Password).HasMaxLength(500);
            entity.Property(e => e.Phone).HasMaxLength(30);
            entity.Property(e => e.Salt).HasMaxLength(500);
            entity.Property(e => e.StatusId)
                .HasDefaultValueSql("'1'")
                .HasColumnName("Status_Id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("Updated_At");

            entity.HasOne(d => d.Status).WithMany(p => p.Users)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("user_ibfk_1");
        });

        modelBuilder.Entity<UserStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user_status");

            entity.Property(e => e.Status).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
