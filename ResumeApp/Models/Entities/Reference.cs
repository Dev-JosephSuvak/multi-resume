using Google.Cloud.Firestore;

namespace ResumeApp.Models.Entities
{
    [FirestoreData]
    public class Reference
    {
        [FirestoreProperty("name")]
        public string? Name { get; set; }

        [FirestoreProperty("title")]
        public string? Title { get; set; }

        [FirestoreProperty("company")]
        public string? Company { get; set; }

        [FirestoreProperty("email")]
        public string? Email { get; set; }

        [FirestoreProperty("relationship")]
        public string? Relationship { get; set; }

        [FirestoreProperty("message")]
        public string? Message { get; set; }

        [FirestoreProperty("rating")]
        public int Rating { get; set; }

        [FirestoreProperty("approved")]
        public bool Approved { get; set; } = false;

        [FirestoreProperty("createdAt")]
        public Timestamp CreatedAt { get; set; }
    }
}
