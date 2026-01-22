# OctoFit Tracker Frontend

React-based frontend for the OctoFit Tracker fitness application.

## Features

- User management and profiles
- Team creation and viewing
- Activity logging and tracking
- Personalized workout suggestions
- Competitive leaderboard

## Setup

### Prerequisites

- Node.js 14+ and npm
- Backend API running on port 8000

### Installation

```bash
# Install dependencies
npm install --prefix octofit-tracker/frontend

# Or if you're in the frontend directory
npm install
```

### Environment Variables

Create a `.env` file in the frontend directory based on `.env.example`:

```bash
# For GitHub Codespaces
REACT_APP_CODESPACE_NAME=your-codespace-name

# For local development (no need to set, will default to localhost)
```

The app will automatically construct the correct API URL:
- **Codespaces**: `https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
- **Local**: `http://localhost:8000/api/`

### Running the App

```bash
# Start the development server
npm start --prefix octofit-tracker/frontend

# Or if you're in the frontend directory
npm start
```

The app will open at `http://localhost:3000`

## Components

### Navigation

The app includes a responsive navigation bar with links to:
- Users - View all registered users
- Teams - View all teams
- Activities - View logged activities
- Workouts - View personalized workout suggestions
- Leaderboard - View competitive rankings

### API Integration

Each component:
- Fetches data from the Django REST API backend
- Handles both paginated (`.results`) and plain array responses
- Includes console logging for debugging
- Displays loading states and error messages
- Uses environment variables for flexible API endpoint configuration

### Components Details

- **Activities.js** - Displays activity logs with duration, distance, and calories
- **Leaderboard.js** - Shows user rankings based on points and activity count
- **Teams.js** - Displays team cards with descriptions and creation dates
- **Users.js** - Lists all users with their team and fitness level
- **Workouts.js** - Shows personalized workout suggestions with exercises

## Tech Stack

- React 19.2.3
- React Router DOM 7.12.0
- Bootstrap 5.3.8
- Fetch API for HTTP requests

## Development

### File Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Activities.js
│   │   ├── Leaderboard.js
│   │   ├── Teams.js
│   │   ├── Users.js
│   │   └── Workouts.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── .env.example
```

### API Endpoints Used

All endpoints are prefixed with `/api/`:

- `GET /api/users/` - List all users
- `GET /api/teams/` - List all teams
- `GET /api/activities/` - List all activities
- `GET /api/workouts/` - List all workouts
- `GET /api/leaderboard/` - List leaderboard entries

## Troubleshooting

### CORS Issues

Make sure the backend has CORS configured to allow requests from the frontend domain.

### API Connection Issues

Check the browser console for logged API URLs and responses. Each component logs:
- The API endpoint being called
- The fetched data
- Any errors encountered

### Environment Variables Not Working

- Environment variables must start with `REACT_APP_`
- Restart the development server after changing `.env`
- Check that the variable is being read correctly in the console logs
