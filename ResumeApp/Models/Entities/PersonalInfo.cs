using Google.Cloud.Firestore;

namespace ResumeApp.Models.Entities;

[FirestoreData]
public class PersonalInfo
{
    [FirestoreProperty("name")]
    public string Name { get; set; } = string.Empty;
    
    [FirestoreProperty("title")]
    public string Title { get; set; } = string.Empty;
    
    [FirestoreProperty("email")]
    public string Email { get; set; } = string.Empty;
    
    [FirestoreProperty("phone")]
    public string Phone { get; set; } = string.Empty;
    
    [FirestoreProperty("linkedIn")]
    public string LinkedIn { get; set; } = string.Empty;
    
    [FirestoreProperty("gitHub")]
    public string GitHub { get; set; } = string.Empty;
    
    [FirestoreProperty("calendly")]
    public string? Calendly { get; set; }
    
    [FirestoreProperty("location")]
    public string Location { get; set; } = string.Empty;
    
    [FirestoreProperty("summary")]
    public string Summary { get; set; } = string.Empty;
}
