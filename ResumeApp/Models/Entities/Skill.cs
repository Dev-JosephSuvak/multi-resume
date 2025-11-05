using Google.Cloud.Firestore;

namespace ResumeApp.Models.Entities;

public class Skill
{
    [FirestoreProperty("category")]
    public string Category { get; set; } = string.Empty;
    
    [FirestoreProperty("items")]
    public List<string> Items { get; set; } = new();
}
