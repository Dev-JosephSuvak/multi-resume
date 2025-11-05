using Microsoft.AspNetCore.Mvc;
using ResumeApp.Models;
using Google.Cloud.Firestore;

namespace ResumeApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : ControllerBase
    {
        private readonly ILogger<ResumeController> _logger;
        private readonly FirestoreDb _firestoreDb;

        public ResumeController(ILogger<ResumeController> logger, FirestoreDb firestoreDb)
        {
            _logger = logger;
            _firestoreDb = firestoreDb;
        }

        [HttpGet]
        public async Task<ActionResult<ResumeData>> GetResume()
        {
            try
            {
                // Fetch data from Firestore
                var docRef = _firestoreDb.Collection("resume").Document("data");
                var snapshot = await docRef.GetSnapshotAsync();

                if (!snapshot.Exists)
                {
                    _logger.LogWarning("Resume data not found in Firestore");
                    return NotFound("Resume data not found");
                }

                // Convert Firestore document to ResumeData
                var resumeData = snapshot.ConvertTo<ResumeData>();
                return Ok(resumeData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching resume data from Firestore");
                return StatusCode(500, "Error fetching resume data");
            }
        }
    }
}
