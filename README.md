# Resume Portfo## Features

- 🎨 Modern, responsive design
- ⚡ Fast development with Vite
- 🔥 Firebase Firestore backend for static deployment
- 🔄 Alternative RESTful API with ASP.NET Core
- 💼 Professional resume layout
- 📱 Mobile-friendly
- 🌐 Netlify-ready static deployment
- 📅 Calendly integration for scheduling calls/interviews
- 📝 Service request form with Firestore integration
- ✨ Automatic Calendly popup after form submissioncation

<<<<<<< Updated upstream
A modern resume and portfolio application built with .NET 8 and React, showcasing skills, projects, experience, and education.

## Features

- Modern, responsive design
- Fast development with Vite
- RESTful API with ASP.NET Core
- Professional resume layout
- # Mobile-friendly
  A modern resume and portfolio application built with .NET 8 and React, with dual deployment options: full-stack .NET + React locally, or static React app with Firebase backend on Netlify.

## Features

- 🎨 Modern, responsive design
- ⚡ Fast development with Vite
- � Firebase Firestore backend for static deployment
- �🔄 Alternative RESTful API with ASP.NET Core
- 💼 Professional resume layout
- 📱 Mobile-friendly
- 🌐 Netlify-ready static deployment
  > > > > > > > Stashed changes

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

### Option 1: Running with Firebase (Netlify/Static Deployment)

This is the recommended approach for deploying to Netlify or other static hosting platforms.

#### Setup Firebase

1. **Create Firebase Project**:

   - Go to https://console.firebase.google.com/
   - Create a new project
   - Enable Firestore Database (production mode)

2. **Set Firestore Security Rules**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Resume data - read-only for all users
       match /resume/{document=**} {
         allow read: if true;
         allow write: if false;
       }

       // Service requests - allow creation by anyone
       match /serviceRequests/{requestId} {
         allow create: if true;
         allow read, update, delete: if false;
       }
     }
   }
   ```

3. **Get Service Account Key**:

   - Project Settings → Service Accounts
   - Generate new private key
   - Save as `ResumeApp/scripts/serviceAccountKey.json`

4. **Seed Firebase with Resume Data**:

   ```bash
   cd ResumeApp
   npm install
   npm run seed:firebase
   ```

5. **Build and Deploy**:

   ```bash
   npm run build
   ```

   The built files will be in `wwwroot/dist/`.

#### Deploy to Netlify

1. Push your code to GitHub
2. Go to https://netlify.com and create new site
3. Connect your GitHub repository
4. Netlify will auto-detect the `netlify.toml` config:
   - **Base directory**: `ResumeApp`
   - **Build command**: `npm run build`
   - **Publish directory**: `wwwroot/dist`
5. Deploy!

Your resume will fetch data directly from Firebase Firestore.

### Option 2: Running in Local Development Mode (.NET Backend)

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

### For Firebase/Static Deployment:

1. **Edit Resume Data**: Update `ClientApp/src/data/resumeData.json`
2. **Re-seed Firebase**: Run `npm run seed:firebase`
3. **Rebuild**: Run `npm run build`
4. **Deploy**: Push to GitHub (Netlify will auto-deploy)

### For .NET Backend:

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
│   │   ├── data/          # Resume data (JSON)
│   │   │   └── resumeData.json
│   │   ├── firebase.js    # Firebase config
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   ├── App.css        # Main styles
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── scripts/               # Utility scripts
│   ├── seedFirebase.js    # Firebase seeding script
│   └── serviceAccountKey.json # Firebase credentials (gitignored)
├── Controllers/           # .NET controllers
│   ├── HomeController.cs
│   └── ResumeController.cs # Resume API (.NET version)
├── Models/               # C# data models
│   └── ResumeModels.cs
├── Views/                # Razor views
│   └── Home/
│       └── Index.cshtml  # Main page
├── wwwroot/              # Static files
│   └── dist/             # Built React app (after npm run build)
├── Program.cs            # .NET app configuration
├── vite.config.js        # Vite configuration
├── package.json          # npm dependencies
└── netlify.toml          # Netlify deployment config
```

## Available Scripts

### npm scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build React app for production (with Firebase)
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

## Customization Tips

1. **Update Personal Info**: Edit the `PersonalInfo` section in `ResumeController.cs`
2. **Add Projects**: Add new `Project` objects to the `Projects` list
3. **Modify Styling**: Edit `App.css` and `index.css` to change colors and layout
4. **Change Theme**: Update CSS variables in `index.css` `:root` selector

## Service Request Feature

The application includes a service request form that allows potential clients to submit project inquiries. The workflow is:

1. **User clicks "Request Services"** button in the header
2. **Modal form opens** with fields for:
   - Name, Email, Company, Phone
   - Project Type (dropdown)
   - Budget Range (dropdown)
   - Timeline (dropdown)
   - Project Description (textarea)
3. **Form submission** saves data to Firestore `serviceRequests` collection with:
   - All form fields
   - Timestamp
   - Status: "new"
4. **Success message** displays confirming submission
5. **Calendly popup** automatically opens after 2 seconds to schedule a call
6. **Modal closes** after another 2 seconds

### Viewing Service Requests

Service requests are stored in Firebase Firestore under the `serviceRequests` collection. To view them:

1. Go to Firebase Console → Firestore Database
2. Navigate to the `serviceRequests` collection
3. Each document contains:
   - Contact information
   - Project details
   - Timestamp
   - Status

You can set up Firebase Functions or Cloud Run to send email notifications when new requests arrive.

## License

This project is open source and available under the MIT License.
