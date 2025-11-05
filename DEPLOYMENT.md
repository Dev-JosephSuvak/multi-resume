# Netlify Deployment Guide

## Quick Deployment Checklist

### ✅ Pre-Deployment Setup (Already Completed)

- [x] Firebase project created
- [x] Firestore database enabled with security rules
- [x] Resume data seeded to Firebase (`npm run seed:firebase`)
- [x] React app configured to use Firebase
- [x] Production build tested (`npm run build`)
- [x] `netlify.toml` configuration created
- [x] `.gitignore` updated to exclude sensitive files

### 🚀 Deploy to Netlify

#### Step 1: Push to GitHub

```bash
# From the project root
git add .
git commit -m "Ready for Netlify deployment with Firebase backend"
git push origin main
```

#### Step 2: Connect to Netlify

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository: `Dev-JosephSuvak/multi-resume`

#### Step 3: Configure Build Settings

Netlify should auto-detect your `netlify.toml` file, but verify:

- **Base directory**: `ResumeApp`
- **Build command**: `npm run build`
- **Publish directory**: `wwwroot/dist`

#### Step 4: Deploy!

Click **"Deploy site"** and wait for the build to complete.

### 🔧 Updating Your Resume

When you want to update your resume content:

1. **Edit the data**:

   ```bash
   # Edit the resume data file
   code ResumeApp/ClientApp/src/data/resumeData.json
   ```

2. **Re-seed Firebase**:

   ```bash
   cd ResumeApp
   npm run seed:firebase
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Updated resume content"
   git push origin main
   ```

Netlify will automatically rebuild and deploy your changes!

### 📍 Important URLs

- **Firebase Console**: https://console.firebase.google.com/project/joseph-suvak-resume
- **Netlify Dashboard**: https://app.netlify.com/
- **GitHub Repo**: https://github.com/Dev-JosephSuvak/multi-resume

### 🔒 Security Notes

✅ **Safe to commit**:

- `resumeData.json` (public resume data)
- `firebase.js` (Firebase web config - public by design)
- `netlify.toml` (deployment config)

❌ **Never commit**:

- `serviceAccountKey.json` (Firebase admin credentials)
- `.env` files with secrets
- `node_modules/`

### 🐛 Troubleshooting

**Build fails on Netlify?**

- Check build logs in Netlify dashboard
- Verify Node.js version (should use Node 18+)
- Ensure all dependencies are in `package.json`

**Resume data not loading?**

- Check browser console for errors
- Verify Firestore security rules allow public read
- Confirm data exists in Firebase Console → Firestore → `resume/data`

**Changes not appearing?**

- Clear browser cache (Cmd+Shift+R on Mac)
- Wait 1-2 minutes for Netlify CDN to update
- Check Netlify deploy logs for success

### 🎉 Success!

Once deployed, your resume will be live at: `https://[your-site-name].netlify.app`

You can customize the domain in Netlify: **Site settings** → **Domain management**
