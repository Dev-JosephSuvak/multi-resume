#!/bin/bash

# Build script for Resume App
# This builds the React app and copies static assets to wwwroot

echo "Building React application..."
export PATH="$HOME/.nvm/versions/node/v24.11.0/bin:$PATH"
npm run build

echo "Copying static assets to wwwroot..."
cp wwwroot/dist/profile.jpeg wwwroot/profile.jpeg
cp wwwroot/dist/resume.pdf wwwroot/resume.pdf 2>/dev/null || cp ClientApp/public/resume.pdf wwwroot/resume.pdf

echo "Build complete! Static assets copied."
echo "Run 'dotnet run' to start the application."
