using Microsoft.AspNetCore.Mvc;
using ResumeApp.Models;

namespace ResumeApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : ControllerBase
    {
        private readonly ILogger<ResumeController> _logger;

        public ResumeController(ILogger<ResumeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<ResumeData> GetResume()
        {
            var resumeData = new ResumeData
            {
                PersonalInfo = new PersonalInfo
                {
                    Name = "Joseph Suvak, Jr., MBA",
                    Title = "(Multi) Full-Stack Developer | Software Engineer",
                    Email = "rjsuvakjr@gmail.com",
                    Phone = "936-445-8449",
                    LinkedIn = "linkedin.com/in/joseph-suvak-msitm",
                    GitHub = "github.com/dev-JosephSuvak",
                    Location = "Christiana, TN",
                    Summary = "Innovative and results-driven Full-Stack Developer with a strong focus on enterprise modernization, automation, and process improvement. Experienced across the full SDLC with expertise in Java, .NET, Node.js, React, Vue, Angular, and SQL. Proven success in leading mainframe migrations, building scalable APIs, mentoring teams, and aligning technical strategy with business goals."
                },
                Skills = new List<Skill>
                {
                    new Skill
                    {
                        Category = "Core Skills",
                        Items = new List<string>
                        {
                            "Jira", "Azure DevOps (ADO)", "Kanban", "Agile", "Scrum",
                            "Single Page App Architecture", "SQL",
                            "Test-Driven Development",
                            "HTML5 / CSS / JavaScript", "REST API Development", "Automation", "CI/CD", "Microservices",
                            "Application Modernization", "Cloud Computing (AWS / GCP / Azure)", "Generative AI Integration", "Data Visualization (Power BI / Tableau)",
                            "Data Integration & ETL", "Service to Service Communication (REST / SOAP / gRPC)"
                        }
                    },
                    new Skill
                    {
                        Category = "Programming & Frameworks",
                        Items = new List<string>
                        {
                            "Java","Spring Boot", "C#",".NET","ASP.NET"," .NET Core", "Python","TypeScript","JavaScript",
                            "React", "Angular", "Vue.js", "Ember.js","Node.js", "Express", "Maven", "NuGet","Flask", "Next.js", "Nuxt.js",
                        }
                    },
                    new Skill
                    {
                        Category = "Tools, Dependencies, & Tool Platforms",
                        Items = new List<string>
                        {
                            "Git", "GitLab", "GitHub", "ServiceNow", "VS Code", "IntelliJ", "Visual Studio",
                            "Azure", "Google Analytics", "Google Cloud", "AWS", "WebSphere","OpenShift", "Visio", "ServiceNow",
                             "Azure DevOps", "TFS", "Jira","Confluence", "Postman", "Insomnia", "Docker", "Kubernetes", "PrismaDB"
                        }
                    }
                },
                Experiences = new List<Experience>
                {
                    new Experience
                    {
                        Company = "Mitsubishi Motors North America (MMNA)",
                        Position = "Software Developer",
                        Duration = "Jan 2023 – November 2025",
                        Location = "Franklin, TN",
                        Responsibilities = new List<string>
                        {
                            "Led modernization of legacy Java/JSP internal systems to Angular and Spring Boot.",
                            "Developed and implemented APIs replacing COBOL mainframe ETL pipelines.",
                            "Scoped, planned, and budgeted development workloads using Agile methodologies.",
                            "Created Jira templates and Agile workflows for bug, story, and deployment tracking.",
                            "Mentored developers and served as operational manager for development planning.",
                            "Generated SQL extracts to resolve production issues and guide team analysis.",
                            "Collaborated with cross-functional teams to define requirements and deliver solutions.",
                            "Participated in code reviews and contributed to team knowledge sharing.",
                        },
                        Technologies = new List<string> { "Java", "Spring Boot", "C#", ".NET", "DB2", "SQL Server", "Angular", "Maven", "GitLab", "Jira" }
                    },
                    new Experience
                    {
                        Company = "Nucamp, Inc.",
                        Position = "Software Development Instructor",
                        Duration = "Nov 2021 – Present",
                        Location = "Remote",
                        Responsibilities = new List<string>
                        {
                            "Delivered full-stack instruction in Node.js, Python, and Flask.",
                            "Graded and coached students on backend development and data visualization.",
                            "Provided curriculum feedback and recommended material improvements."
                        },
                        Technologies = new List<string> { "Node.js", "Python", "Flask", "HTML", "CSS", "JavaScript", "PostgreSQL", "Discord" }
                    },
                    new Experience
                    {
                        Company = "HCA Healthcare, ITG",
                        Position = "Application Developer II / I (Full Stack)",
                        Duration = "Jul 2021 – Dec 2022",
                        Location = "Nashville, TN",
                        Responsibilities = new List<string>
                        {
                            "Developed UI and refined microservice components in React, Vue, and Ember for the MyHealthOne patient portal.",
                            "Led cross-team coordination, offshore onboarding, and source control process improvements.",
                            "Wrote RESTful APIs and SQL triggers to support enterprise patient applications.",
                            "Resolved build issues in Azure DevOps pipelines to improve local build reliability and multi-team velocity.",
                            "Created reusable ticket templates and documentation for development and QA teams.",
                            "Mentored other developers and conducted code reviews to ensure best practices.",
                            "Established the department's first \"Dev Coffee\" initiative to establish knowledge sharing & coordination between teams. The initiative caught multiple teams' lack of communication early and helped prevent potential production issues."
                        },
                        Technologies = new List<string> { "React", "Vue", "Node.js", "Java 8", "Spring Boot", "Azure DevOps", "T-SQL" }
                    },
                    new Experience
                    {
                        Company = "HCA Healthcare, ITG",
                        Position = "Associate QA Test Analyst",
                        Duration = "Mar 2020 – Jul 2021",
                        Location = "Nashville, TN",
                        Responsibilities = new List<string>
                        {
                            "Developed automated test scripts using Selenium and Jest.",
                            "Tested web apps and APIs across browsers and devices under Agile methodology.",
                            "Configured CI pipelines and YAML-based test automation for GitHub workflows.",
                            "Trained analysts and managers on QA best practices and ticketing systems (Jira, ADO, ALM)."
                        },
                        Technologies = new List<string> { "C#", "Java", "Selenium", "Node.js", "Jest", "SQL" }
                    }
                },
                Education = new List<Education>
                {
                    new Education
                    {
                        Institution = "Western Governors University",
                        Degree = "Master of Business Administration",
                        Field = "Information Technology Management",
                        Duration = "Completed 2025"
                    },
                    new Education
                    {
                        Institution = "Western Governors University",
                        Degree = "Master of Science",
                        Field = "Information Technology Management",
                        Duration = "Completed 2020"
                    },
                    new Education
                    {
                        Institution = "Western Governors University",
                        Degree = "Bachelor of Science",
                        Field = "Business Information Technology Management",
                        Duration = "Completed 2019"
                    },
                    new Education
                    {
                        Institution = "Vanderbilt University",
                        Degree = "Professional Course",
                        Field = "Full-Stack Web Development Bootcamp",
                        Duration = "2021"
                    }
                },
                Projects = new List<Project>
                {
                                        new Project
                    {
                        Title = " (Personal Consulting for Marketing Startup) GPT-4 Integrated Marketing Content",
                        Description = "Developed a GPT-4 powered content generation tool for a marketing startup, streamlining the content creation process.",
                        Technologies = new List<string> { "Python", "Flask", "DynamoDB", "AWS Suite", "Go-HighLevel","WordPress", "React"},
                        Highlights = new List<string>
                        {
                            "Collaborated with marketing stakeholder to identify content needs and define project scope.",
                            "Designed and implemented RESTful APIs for real-time content generation and management.",
                            "Developed a comprehensive testing strategy to ensure API reliability and performance.",
                            "Created user authentication and authorization using AWS IAM for secure access to the content generation tool.",
                            "Set up serverless architecture using AWS Lambda and API Gateway to ensure scalability and cost-efficiency.",
                            "Implemented CI/CD pipelines using AWS CodePipeline and CodeBuild for automated testing and deployment.",
                            "Set up monitoring and logging using AWS CloudWatch to track API usage and performance.",
                            "Set up token-based authentication and role-based access control for secure API usage.",
                            "Setup monitoring and logging using Google Cloud's operations suite to track API usage and performance.",
                            "Implemented containerization using Docker for microservices.",
                            "Deployed microservices on Google Cloud Platform."
                        }
                    },
                    new Project
                    {
                        Title = " (Personal Consulting for Railway Startup) Microservices for Railway-specifiic Asset Tracking System",
                        Description = "Created the microservices architecture for a railway asset tracking system utilizing Python, Flask, and PostgreSQL.",
                        Technologies = new List<string> { "Python", "Flask", "PostgreSQL", "Google Cloud" },
                        Highlights = new List<string>
                        {
                            "Negotiated with stakeholders to gather requirements and define project scope.",
                            "Designed and implemented RESTful APIs for real-time asset tracking and management.",
                            "Developed a comprehensive testing strategy to ensure API reliability and performance.",
                            "Negotiated introductory pricing and managed deployment on multiple cloud platforms to determine cost-effectiveness.",
                            "Implemented containerization using Docker for microservices.",
                            "Deployed microservices on Google Cloud Platform."
                        }
                    },
                    new Project
                    {
                        Title = "Mainframe Migration to Java-Based API",
                        Description = "Replaced COBOL-based system with modern API-driven architecture.",
                        Technologies = new List<string> { "Java", "Spring Boot", "SQL Server", "Salesforce", "ETL", "Spring Batch", "Talend", "Informatica" },
                        Highlights = new List<string>
                        {
                            "Redesigned legacy COBOL ETL into a Java API and nightly SQL-based ETL jobs tailored to individual business needs.",
                            "Introduced data sanitization and duplication detection for customer records.",
                            "Established direct integration between MMNA and Salesforce systems."
                        }
                    },
                    new Project
                    {
                        Title = "Mobile Barcode Scanner – Coding for Caregivers",
                        Description = "As part of an internal cross-company project to reduce nurse workflow costs & performance" +
                                      "through custom iOS-compatible barcode solution to update ServiceNow with asset information.",
                        Technologies = new List<string> { "C#", ".NET", "AJAX", "jQuery", "ServiceNow", "Mobile" },
                        Highlights = new List<string>
                        {
                            "Built network device scanning prototype with UDP endpoint integration.",
                            "Project would achieve ~$19M in potential savings vs $1.3M implementation cost."
                        }
                    },
                    new Project
                    {
                        Title = "Insurance Card Web Scraping",
                        Description = "AI-powered image parser to pre-fill patient insurance data.",
                        Technologies = new List<string> { "Python", "Java", ".NET", "Chai", "Power BI", "Selenium", "Microsoft Azure", "Cosmos DB", "Azure Functions" },
                        Highlights = new List<string>
                        {
                            "Automated image parsing validation across 6 models using runtime scripts.",
                            "Aided in delivering solution 1 month ahead of schedule through enhanced coordination and collaboration."
                        }
                    }
                }
            };

            return Ok(resumeData);
        }
    }
}
