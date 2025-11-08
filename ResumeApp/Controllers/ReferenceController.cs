using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using ResumeApp.Models.Entities;

namespace ResumeApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReferenceController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private readonly ILogger<ReferenceController> _logger;

        public ReferenceController(FirestoreDb firestoreDb, ILogger<ReferenceController> logger)
        {
            _firestoreDb = firestoreDb;
            _logger = logger;
        }

        // GET: api/reference - Get approved references only
        [HttpGet]
        public async Task<IActionResult> GetApprovedReferences()
        {
            try
            {
                CollectionReference collection = _firestoreDb.Collection("references");
                Query query = collection.WhereEqualTo("approved", true);
                QuerySnapshot snapshot = await query.GetSnapshotAsync();

                var references = snapshot.Documents.Select(doc =>
                {
                    var reference = doc.ConvertTo<Reference>();
                    return new
                    {
                        id = doc.Id,
                        name = reference.Name,
                        title = reference.Title,
                        company = reference.Company,
                        relationship = reference.Relationship,
                        message = reference.Message,
                        rating = reference.Rating,
                        createdAt = reference.CreatedAt.ToDateTime()
                    };
                })
                .OrderBy(r => GetRelationshipPriority(r.relationship))
                .ThenByDescending(r => r.createdAt)
                .ToList();

                return Ok(references);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving approved references");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while retrieving references."
                });
            }
        }

        private int GetRelationshipPriority(string? relationship)
        {
            return relationship?.ToLower() switch
            {
                "manager" => 1,
                "direct-report" => 2,
                "colleague" => 3,
                "client" => 4,
                "mentor" => 5,
                "other" => 6,
                _ => 99
            };
        }

                [HttpGet("all")]
        public async Task<IActionResult> GetAllReferences()
        {
            try
            {
                CollectionReference collection = _firestoreDb.Collection("references");
                QuerySnapshot snapshot = await collection.GetSnapshotAsync();

                var references = snapshot.Documents.Select(doc =>
                {
                    var reference = doc.ConvertTo<Reference>();
                    return new
                    {
                        id = doc.Id,
                        name = reference.Name,
                        title = reference.Title,
                        company = reference.Company,
                        email = reference.Email,
                        relationship = reference.Relationship,
                        message = reference.Message,
                        rating = reference.Rating,
                        approved = reference.Approved,
                        createdAt = reference.CreatedAt.ToDateTime()
                    };
                })
                .OrderByDescending(r => r.createdAt)
                .ToList();

                return Ok(references);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all references");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while retrieving references."
                });
            }
        }

                [HttpPost]
        public async Task<IActionResult> SubmitReference([FromBody] Reference reference)
        {
            try
            {
                if (reference == null)
                {
                    return BadRequest("Reference data is required");
                }

                // Validate required fields
                if (string.IsNullOrWhiteSpace(reference.Name) ||
                    string.IsNullOrWhiteSpace(reference.Email) ||
                    string.IsNullOrWhiteSpace(reference.Relationship) ||
                    string.IsNullOrWhiteSpace(reference.Message))
                {
                    return BadRequest("Name, Email, Relationship, and Message are required");
                }

                // Set metadata
                reference.CreatedAt = Timestamp.GetCurrentTimestamp();
                reference.Approved = false; // All new references need approval

                // Save to Firestore
                CollectionReference collection = _firestoreDb.Collection("references");
                DocumentReference docRef = await collection.AddAsync(reference);

                _logger.LogInformation($"Reference submitted by {reference.Name} with ID: {docRef.Id}");

                return Ok(new
                {
                    success = true,
                    message = "Thank you for your reference! It will be reviewed and published soon.",
                    referenceId = docRef.Id
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error submitting reference");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while submitting your reference. Please try again."
                });
            }
        }

        // PATCH: api/reference/{id}/approve - Approve a reference
        [HttpPatch("{id}/approve")]
        public async Task<IActionResult> ApproveReference(string id)
        {
            try
            {
                DocumentReference docRef = _firestoreDb.Collection("references").Document(id);
                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

                if (!snapshot.Exists)
                {
                    return NotFound(new { success = false, message = "Reference not found" });
                }

                await docRef.UpdateAsync("approved", true);

                _logger.LogInformation($"Reference {id} approved");

                return Ok(new
                {
                    success = true,
                    message = "Reference approved successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error approving reference {id}");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while approving the reference."
                });
            }
        }

                [HttpPatch("{id}/reject")]
        public async Task<IActionResult> RejectReference(string id)
        {
            try
            {
                DocumentReference docRef = _firestoreDb.Collection("references").Document(id);
                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

                if (!snapshot.Exists)
                {
                    return NotFound(new { success = false, message = "Reference not found" });
                }

                await docRef.UpdateAsync("approved", false);

                _logger.LogInformation($"Reference {id} rejected");

                return Ok(new
                {
                    success = true,
                    message = "Reference rejected successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error rejecting reference {id}");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while rejecting the reference."
                });
            }
        }

                [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReference(string id)
        {
            try
            {
                DocumentReference docRef = _firestoreDb.Collection("references").Document(id);
                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

                if (!snapshot.Exists)
                {
                    return NotFound(new { success = false, message = "Reference not found" });
                }

                await docRef.DeleteAsync();

                _logger.LogInformation($"Reference {id} deleted");

                return Ok(new
                {
                    success = true,
                    message = "Reference deleted successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting reference {id}");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while deleting the reference."
                });
            }
        }
    }
}
