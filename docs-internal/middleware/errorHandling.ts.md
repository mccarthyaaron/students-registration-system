# errorHandling.ts Documentation

## Overview
This file contains middleware functions for handling errors and request validation in the Express application.

## Core Responsibilities
1. Error Handling
   - Provides genericErrorMiddleware for global error handling
   - Implements checkDataField middleware for request validation

2. Request Validation
   - Validates incoming request data
   - Ensures required fields are present

## Integration Points
- Used in index.ts as application-wide middleware
- Integrated with Express error handling chain
- Works with custom error types from utilities/types.ts

## Notable Features
- Centralized error handling
- Request data validation
- Consistent error response format 