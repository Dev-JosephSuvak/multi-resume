#!/bin/bash

export PATH="$HOME/.nvm/versions/node/v24.11.0/bin:$PATH"
npm run build

cp wwwroot/dist/profile.jpeg wwwroot/profile.jpeg 2>/dev/null
cp ClientApp/public/resume.pdf wwwroot/resume.pdf 2>/dev/null

mkdir -p ../JavaSpring/src/main/resources/static
cp -r wwwroot/dist/* ../JavaSpring/src/main/resources/static/

mkdir -p ../PythonFlask/static
cp -r wwwroot/dist/* ../PythonFlask/static/

echo "Build complete"
