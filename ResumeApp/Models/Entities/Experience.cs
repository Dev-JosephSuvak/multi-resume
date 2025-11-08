using Google.Cloud.Firestore;

namespace ResumeApp.Models.Entities;

[FirestoreData]
public class Experience
{
    [FirestoreProperty("company")]
    public string Company { get; set; } = string.Empty;
    
    [FirestoreProperty("position")]
    public string Position { get; set; } = string.Empty;
    
    [FirestoreProperty("duration")]
    public string Duration { get; set; } = string.Empty;
    
    [FirestoreProperty("location")]
    public string Location { get; set; } = string.Empty;
    
    [FirestoreProperty("responsibilities")]
    public List<string> Responsibilities { get; set; } = new();
    
    [FirestoreProperty("technologies")]
    public List<string> Technologies { get; set; } = new();
    
    [FirestoreProperty("gitHubLink")]
    public string? GitHubLink { get; set; }
}
