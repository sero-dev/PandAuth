using System.Diagnostics;

namespace Pandauth.API.Domain;

[DebuggerDisplay("{Title} ({Year})")]
public class Book: Auditable
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public int? Year { get; set; }
    public string? AuthorName { get; set; }
}
