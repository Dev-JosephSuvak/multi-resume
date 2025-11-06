using Google.Cloud.Firestore;

namespace ResumeApp.Models.Entities
{
    [FirestoreData]
    public class ServiceRequest
    {
        [FirestoreProperty("name")]
        public string? Name { get; set; }

        [FirestoreProperty("email")]
        public string? Email { get; set; }

        [FirestoreProperty("company")]
        public string? Company { get; set; }

        [FirestoreProperty("phone")]
        public string? Phone { get; set; }

        [FirestoreProperty("projectType")]
        public string? ProjectType { get; set; }

        [FirestoreProperty("budget")]
        public string? Budget { get; set; }

        [FirestoreProperty("timeline")]
        public string? Timeline { get; set; }

        [FirestoreProperty("description")]
        public string? Description { get; set; }

        [FirestoreProperty("createdAt")]
        public Timestamp CreatedAt { get; set; }

        [FirestoreProperty("status")]
        public string Status { get; set; } = "new";
    }
}
