using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using ResumeApp.Models.Entities;

namespace ResumeApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceRequestController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private readonly ILogger<ServiceRequestController> _logger;

        public ServiceRequestController(FirestoreDb firestoreDb, ILogger<ServiceRequestController> logger)
        {
            _firestoreDb = firestoreDb;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateServiceRequest([FromBody] ServiceRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Service request data is required");
                }

                if (string.IsNullOrWhiteSpace(request.Name) || 
                    string.IsNullOrWhiteSpace(request.Email) || 
                    string.IsNullOrWhiteSpace(request.ProjectType) ||
                    string.IsNullOrWhiteSpace(request.Description))
                {
                    return BadRequest(new { error = "Missing required fields" });
                }

                request.CreatedAt = Timestamp.FromDateTime(DateTime.UtcNow);
                request.Status = "pending";

                var docRef = _firestoreDb.Collection("serviceRequests").Document();
                await docRef.SetAsync(request);

                _logger.LogInformation($"Service request created with ID: {docRef.Id}");

                return Ok(new
                {
                    success = true,
                    message = "Service request submitted successfully",
                    requestId = docRef.Id
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating service request");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while submitting your request. Please try again."
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetServiceRequests()
        {
            try
            {
                CollectionReference collection = _firestoreDb.Collection("serviceRequests");
                QuerySnapshot snapshot = await collection.OrderByDescending("createdAt").GetSnapshotAsync();

                var requests = snapshot.Documents.Select(doc =>
                {
                    var request = doc.ConvertTo<ServiceRequest>();
                    return new
                    {
                        id = doc.Id,
                        name = request.Name,
                        email = request.Email,
                        company = request.Company,
                        phone = request.Phone,
                        projectType = request.ProjectType,
                        budget = request.Budget,
                        timeline = request.Timeline,
                        description = request.Description,
                        createdAt = request.CreatedAt.ToDateTime(),
                        status = request.Status
                    };
                }).ToList();

                return Ok(requests);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving service requests");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while retrieving service requests."
                });
            }
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateRequestStatus(string id, [FromBody] StatusUpdate statusUpdate)
        {
            try
            {
                DocumentReference docRef = _firestoreDb.Collection("serviceRequests").Document(id);
                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

                if (!snapshot.Exists)
                {
                    return NotFound(new { success = false, message = "Service request not found" });
                }

                await docRef.UpdateAsync("status", statusUpdate.Status);

                _logger.LogInformation($"Service request {id} status updated to: {statusUpdate.Status}");

                return Ok(new
                {
                    success = true,
                    message = "Status updated successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating service request {id} status");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while updating the status."
                });
            }
        }
    }

    public class StatusUpdate
    {
        public string Status { get; set; } = string.Empty;
    }
}
