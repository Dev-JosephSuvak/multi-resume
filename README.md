# Resume Portfolio

A modern resume and portfolio application built with .NET 8 and React, showcasing skills, projects, experience, and education.

## Features

- Modern, responsive design
- Fast development with Vite
- Firebase Firestore backend for static deployment
- Alternative RESTful API with ASP.NET Core
- Professional resume layout
- Mobile-friendly
- Netlify-ready static deployment
- Calendly integration for scheduling calls/interviews
- Service request form with Firestore integration
- Automatic Calendly popup after form submission

## Tech Stack

- **Backend**:
  - Option 1: .NET 8, ASP.NET Core MVC (local development)
  - Option 2: Firebase Firestore (static/Netlify deployment)
- **Frontend**: React 19, Vite
- **Styling**: Modern CSS with CSS Variables
- **Database**: Firebase Firestore
- **Deployment**: Netlify (static) or any .NET hosting platform

## Getting Started

### Prerequisites

- .NET 8 SDK (for local .NET development)
- Node.js 24 LTS (or newer)
- npm
- Firebase account (for static deployment)

### Running with Firebase (Netlify/Static Deployment)

This is the recommended approach for deploying to Netlify or other static hosting platforms.

#### Setup Firebase

1. Create Firebase Project at https://console.firebase.google.com/
2. Enable Firestore Database (production mode)
3. Get Service Account Key and save as `ResumeApp/scripts/serviceAccountKey.json`
4. Seed Firebase with Resume Data:

```bash
cd ResumeApp
npm install
npm run seed:firebase
```

5. Build and Deploy:

```bash
npm run build
```

#### Deploy to Netlify

1. Push your code to GitHub
2. Go to https://netlify.com and create new site
3. Connect your GitHub repository
4. Netlify will auto-detect the `netlify.toml` config

### Running in Local Development Mode (.NET Backend)

Terminal 1 - Start the .NET Backend:

```bash
cd ResumeApp
dotnet run
```

Terminal 2 - Start the Vite Dev Server:

```bash
cd ResumeApp
npm run dev
```

## Customizing Your Resume

### For Firebase/Static Deployment:

1. Edit Resume Data: Update `ClientApp/src/data/resumeData.json`
2. Re-seed Firebase: Run `npm run seed:firebase`
3. Rebuild: Run `npm run build`
4. Deploy: Push to GitHub (Netlify will auto-deploy)

### For .NET Backend:

Edit the `ResumeController.cs` file in the `Controllers` folder to update your resume data.

## Project Structure

```
ResumeApp/
├── ClientApp/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── data/          # Resume data (JSON)
│   │   ├── firebase.js    # Firebase config
│   │   ├── App.jsx        # Main app component
│   │   └── App.css        # Main styles
│   └── index.html         # HTML template
├── scripts/               # Utility scripts
│   └── seedFirebase.js    # Firebase seeding script
├── Controllers/           # .NET controllers
│   └── ResumeController.cs # Resume API
├── Models/               # C# data models
│   └── ResumeModels.cs
├── wwwroot/              # Static files
│   └── dist/             # Built React app
├── Program.cs            # .NET app configuration
├── vite.config.js        # Vite configuration
└── package.json          # npm dependencies
```

## Available Scripts

### npm scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build React app for production
- `npm run preview` - Preview production build locally
- `npm run seed:firebase` - Seed Firebase Firestore with resume data

### .NET commands

- `dotnet run` - Start the .NET application
- `dotnet build` - Build the .NET project
- `dotnet watch run` - Run with hot reload

## API Endpoints

### .NET Backend (Local Development)

- `GET /api/resume` - Get complete resume data

### Firebase Backend (Static Deployment)

- Data stored in Firestore: `resume/data` document
- Accessed via Firebase SDK in `src/firebase.js`

## Service Request Feature

The application includes a service request form that allows potential clients to submit project inquiries. Submissions are stored in Firestore and trigger a Calendly popup for scheduling.

## License

This project is open source and available under the MIT License.
