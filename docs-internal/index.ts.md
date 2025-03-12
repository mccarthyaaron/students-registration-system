# index.ts Documentation

## Overview
This file serves as the main entry point for the backend Express server application.

## Core Responsibilities
1. Server Configuration
   - Sets up Express server
   - Configures environment variables using dotenv
   - Handles JSON parsing middleware
   - Sets up error handling middleware

2. Database Connection
   - Has capability to connect to either local MongoDB or Atlas Learning DB
   - Currently both connection options are commented out

3. Routing
   - Mounts the students router at '/api/students'
   - Implements error handling middleware

4. Server Launch
   - Starts server on configured PORT (defaults to 5000)
   - Implements error handling for server startup issues
   - Specifically handles EADDRINUSE errors (port already in use)

## Key Dependencies
- express
- dotenv
- colors (for console styling)

## Integration Points
- Connects with student routes via studentsRouter
- Uses error handling middleware from errorHandling.ts
- Uses database connection functions from config.ts
- Uses type definitions from utilities/types.ts

## Configuration
- PORT: Configurable via environment variable, defaults to 5000
- Database connection: Currently commented out, needs to be uncommented and configured

## Notable Features
- Colored console output for better visibility
- Graceful error handling for server startup issues
- Centralized error handling middleware 