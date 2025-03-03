
namespace Pandauth.API.Domain;

public abstract class Auditable
{
    public required string CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public string? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }
}
