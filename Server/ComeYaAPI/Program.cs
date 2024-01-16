using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Stripe;
using ComeYaAPI.Services;
using Server.Controllers;
using Microsoft.AspNetCore.Hosting.Server;
using ComeYaAPI.Services.Stripe;
using ComeYaAPI.Interfaces;
using ComeYaAPI.Models.DTOs.RestaurantDTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt Authorization",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id= "Bearer"
                }
            },
            new string[]{ }
        }
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = true;
    options.SaveToken = true;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateAudience= false,
        ValidateIssuer= false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = false,
       
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
}
);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    builder.AllowAnyHeader()
    .AllowAnyOrigin()
    .AllowAnyMethod());
    
    
});
var conn = builder.Configuration.GetConnectionString("ComeYa");
builder.Services.AddDbContext<ComeyaContext>(option => option.UseMySql(conn, ServerVersion.AutoDetect(conn)));

// Mapper
builder.Services.AddAutoMapper(typeof(Program));

//
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
// UnitOfWork
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IWebToken,WebToken>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<Hasher>();
builder.Services.AddTransient<CheckoutController>();
builder.Services.AddScoped<IStripeService, StripeService>();





var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors();

app.MapControllers();

app.Run();
