using Google.Cloud.Firestore;

namespace ResumeApp.Models.Entities;

public class Education
{
    [FirestoreProperty("institution")]
    public string Institution { get; set; } = string.Empty;
    
    [FirestoreProperty("degree")]
    public string Degree { get; set; } = string.Empty;
    
    [FirestoreProperty("field")]
    public string Field { get; set; } = string.Empty;
    
    [FirestoreProperty("duration")]
    public string Duration { get; set; } = string.Empty;
    
    [FirestoreProperty("gpa")]
    public string? GPA { get; set; }
    
    [FirestoreProperty("highlights")]
    public List<string> Highlights { get; set; } = new();
}
