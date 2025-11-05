using Google.Cloud.Firestore;
using ResumeApp.Models.Entities;

namespace ResumeApp.Models;

[FirestoreData]
public class ResumeData
{
    [FirestoreProperty("personalInfo")]
    public PersonalInfo PersonalInfo { get; set; } = new();
    
    [FirestoreProperty("skills")]
    public List<Skill> Skills { get; set; } = new();
    
    [FirestoreProperty("projects")]
    public List<Project> Projects { get; set; } = new();
    
    [FirestoreProperty("experiences")]
    public List<Experience> Experiences { get; set; } = new();
    
    [FirestoreProperty("education")]
    public List<Education> Education { get; set; } = new();
}

