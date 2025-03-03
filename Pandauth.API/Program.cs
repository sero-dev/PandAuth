using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Pandauth.API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var folder = Environment.SpecialFolder.LocalApplicationData;
    var path = Environment.GetFolderPath(folder);
    var dbPath = Path.Join(path, "books.db");

    options.UseSqlite($"Data Source={dbPath}");
});

builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme);
builder.Services.AddAuthorization();

builder.Services.AddCors(options => 
    options.AddDefaultPolicy(p => p
        .WithOrigins(builder.Configuration["Cors:Origin"] ?? throw new Exception("Missing Configuration [Cors:Origin]"))
    )
);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
