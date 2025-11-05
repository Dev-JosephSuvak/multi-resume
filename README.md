# Resume Portfolio Application

A modern resume and portfolio application built with .NET 8 and React, showcasing your skills, projects, experience, and education.

## Features

- 🎨 Modern, responsive design
- ⚡ Fast development with Vite
- 🔄 RESTful API with ASP.NET Core
- 💼 Professional resume layout
- 📱 Mobile-friendly

## Tech Stack

- **Backend**: .NET 8, ASP.NET Core MVC
- **Frontend**: React 19, Vite
- **Styling**: Modern CSS with CSS Variables

## Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js 24 LTS (or newer)
- npm

### Running in Development Mode

You'll need to run both the .NET backend and the React frontend:

#### Terminal 1 - Start the .NET Backend

```bash
cd ResumeApp
dotnet run
```

The .NET app will start on `https://localhost:7292` (or check the console output for the exact URL).

#### Terminal 2 - Start the Vite Dev Server

```bash
cd ResumeApp
npm run dev
```

The Vite dev server will start on `http://localhost:5173`.

Now open your browser and navigate to the .NET app URL (e.g., `https://localhost:7292`). The page will load the React app from the Vite dev server.

### Building for Production

1. Build the React app:

```bash
cd ResumeApp
npm run build
```

This will create optimized production files in `wwwroot/dist/`.

2. Run the .NET app:

```bash
dotnet run
```

The app will serve the built React files from `wwwroot/dist/`.

## Customizing Your Resume

Edit the `ResumeController.cs` file in the `Controllers` folder to update your:

- Personal information
- Skills
- Projects
- Experience
- Education

The data is served via the `/api/resume` endpoint.

## Project Structure

```
ResumeApp/
├── ClientApp/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   ├── App.css        # Main styles
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── Controllers/           # .NET controllers
│   ├── HomeController.cs
│   └── ResumeController.cs # Resume API
├── Models/               # C# data models
│   └── ResumeModels.cs
├── Views/                # Razor views
│   └── Home/
│       └── Index.cshtml  # Main page
├── wwwroot/              # Static files
│   └── dist/             # Built React app (after npm run build)
├── Program.cs            # .NET app configuration
├── vite.config.js        # Vite configuration
└── package.json          # npm dependencies
```

## Available Scripts

### npm scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build React app for production
- `npm run preview` - Preview production build locally

### .NET commands

- `dotnet run` - Start the .NET application
- `dotnet build` - Build the .NET project
- `dotnet watch run` - Run with hot reload

## API Endpoints

- `GET /api/resume` - Get complete resume data

## Customization Tips

1. **Update Personal Info**: Edit the `PersonalInfo` section in `ResumeController.cs`
2. **Add Projects**: Add new `Project` objects to the `Projects` list
3. **Modify Styling**: Edit `App.css` and `index.css` to change colors and layout
4. **Change Theme**: Update CSS variables in `index.css` `:root` selector

## License

This project is open source and available under the MIT License.
