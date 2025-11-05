namespace ResumeApp.Models;

public class ResumeData
{
    public PersonalInfo PersonalInfo { get; set; } = new();
    public List<Skill> Skills { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
    public List<Experience> Experiences { get; set; } = new();
    public List<Education> Education { get; set; } = new();
}

public class PersonalInfo
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string LinkedIn { get; set; } = string.Empty;
    public string GitHub { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
}

public class Skill
{
    public string Category { get; set; } = string.Empty;
    public List<string> Items { get; set; } = new();
}

public class Project
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
    public string? Link { get; set; }
    public string? GitHubLink { get; set; }
    public List<string> Highlights { get; set; } = new();
}

public class Experience
{
    public string Company { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public List<string> Responsibilities { get; set; } = new();
    public List<string> Technologies { get; set; } = new();
    public string? GitHubLink { get; set; }
}

public class Education
{
    public string Institution { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string Field { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string? GPA { get; set; }
    public List<string> Highlights { get; set; } = new();
}
