﻿using Microsoft.AspNetCore.Mvc;
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
        var books = await context.Books.AsNoTracking().ToListAsync();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var bookToDelete = await context.Books.AsNoTracking().SingleOrDefaultAsync(b => b.Id == id);
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

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBookDto request)
    {
        if (id != request.Id) return BadRequest("Request Body ID does not match route ID");

        var bookToUpdate = await context.Books.SingleOrDefaultAsync(b => b.Id == id);

        if (bookToUpdate is null) return NotFound();

        bookToUpdate.Title = request.Title;
        bookToUpdate.Year = request.Year;
        bookToUpdate.AuthorName = request.AuthorName;

        await context.SaveChangesAsync();

        return Ok(bookToUpdate);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        var bookToDelete = await context.Books.SingleOrDefaultAsync(b => b.Id == id);
        if (bookToDelete is null) return NotFound();

        context.Books.Remove(bookToDelete);
        await context.SaveChangesAsync();

        return Ok(bookToDelete);
    }
}

[DebuggerDisplay("{Title} ({Year})")]
public class CreateBookDto
{
    public required string Title { get; set; }
    public int? Year { get; set; }
    public string? AuthorName { get; set; }
}

[DebuggerDisplay("{Id}: {Title} ({Year})")]
public class UpdateBookDto
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public int? Year { get; set; }
    public string? AuthorName { get; set; }
}