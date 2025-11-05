using Google.Cloud.Firestore;

var builder = WebApplication.CreateBuilder(args);

// Configure Firestore
var projectId = "joseph-suvak-resume";
var credentialPath = Path.Combine(Directory.GetCurrentDirectory(), "scripts", "serviceAccountKey.json");

// Set the environment variable for Google credentials
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialPath);

// Register FirestoreDb
builder.Services.AddSingleton(_ => FirestoreDb.Create(projectId));

builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVite",
        policy => policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowVite");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
