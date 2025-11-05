using Google.Cloud.Firestore;

namespace ResumeApp.Models.Entities;

public class Project
{
    [FirestoreProperty("title")]
    public string Title { get; set; } = string.Empty;
    
    [FirestoreProperty("description")]
    public string Description { get; set; } = string.Empty;
    
    [FirestoreProperty("technologies")]
    public List<string> Technologies { get; set; } = new();
    
    [FirestoreProperty("link")]
    public string? Link { get; set; }
    
    [FirestoreProperty("gitHubLink")]
    public string? GitHubLink { get; set; }
    
    [FirestoreProperty("highlights")]
    public List<string> Highlights { get; set; } = new();
}
