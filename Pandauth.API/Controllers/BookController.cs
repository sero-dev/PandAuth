using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pandauth.API.Domain;
using System.Diagnostics;

namespace Pandauth.API.Controllers;

[ApiController]
[Route("api/books")]
public class BookController(ApplicationDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var books = await context.Books.ToListAsync();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var bookToDelete = await context.Books.SingleOrDefaultAsync(b => b.Id == id);
        if (bookToDelete is null) return NotFound();
        return Ok(bookToDelete);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBookDto request)
    {
        var newBook = context.Books.Add(new Book
        {
            Title = request.Title,
            Year = request.Year,
            AuthorName = request.AuthorName,
            CreatedBy = string.Empty,
        });

        await context.SaveChangesAsync();
        return Created($"/api/books/{newBook.Entity.Id}", newBook.Entity);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        var bookToDelete = await context.Books.SingleOrDefaultAsync(b => b.Id == id);
        if (bookToDelete is null) return NotFound();

        context.Books.Remove(bookToDelete);
        await context.SaveChangesAsync();

        return Ok();
    }
}

[DebuggerDisplay("{Title} ({Year})")]
public class CreateBookDto
{
    public required string Title { get; set; }
    public int? Year { get; set; }
    public string? AuthorName { get; set; }
}