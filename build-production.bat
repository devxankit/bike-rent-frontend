@echo off
echo Building frontend for production...

REM Set environment variables
set REACT_APP_API_URL=https://bookyourride.in
set GENERATE_SOURCEMAP=false
set PUBLIC_URL=/

REM Clean previous build
echo Cleaning previous build...
if exist build rmdir /s /q build

REM Install dependencies
echo Installing dependencies...
call npm install

REM Build the application
echo Building application...
call npm run build:prod

REM Check if build was successful
if exist build (
    echo Build successful! Build directory created.
    echo Build contents:
    dir build
    echo.
    echo Static files in build/static:
    dir build\static
) else (
    echo Build failed! No build directory found.
    exit /b 1
)

echo.
echo Frontend build completed successfully!
echo You can now deploy the 'build' folder to your hosting service.
pause
