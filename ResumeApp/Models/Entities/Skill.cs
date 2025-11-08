using Google.Cloud.Firestore;

namespace ResumeApp.Models.Entities;

[FirestoreData]
public class Skill
{
    [FirestoreProperty("category")]
    public string Category { get; set; } = string.Empty;
    
    [FirestoreProperty("items")]
    public List<string> Items { get; set; } = new();
}
