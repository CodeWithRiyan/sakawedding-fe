# Deployment Guide for Coolify

This guide will help you deploy the SakaWedding application to your Coolify server.

## Architecture

The application is a full-stack setup:
- **Frontend**: React + Vite (built to static files)
- **Backend**: Express.js (serves API + static frontend)
- **Database**: JSON files (simple storage)

In production, the Express server serves both:
1. API endpoints at `/api/*`
2. Frontend static files for all other routes

## Deployment Steps

### 1. Push to Git Repository

Make sure all your changes are committed and pushed to your Git repository:

```bash
git add .
git commit -m "feat: add backend server and deployment config"
git push origin main
```

### 2. Configure Coolify

1. **Create a new application** in Coolify
2. **Connect your Git repository**
3. **Set the domain** you want to use

### 3. Environment Variables (Optional)

In Coolify, you can set these environment variables:

- `PORT` - The port your app will run on (Coolify sets this automatically)
- `NODE_ENV` - Set to `production` (automatically set by nixpacks.toml)
- `VITE_API_URL` - (Optional) If you need a custom API URL

### 4. Build & Deploy

Coolify will automatically:
1. Install dependencies with `pnpm install`
2. Build the frontend with `vite build`
3. Build the backend with TypeScript compiler
4. Start the server with `node server/dist/index.js`

The nixpacks.toml file is already configured to handle this.

## What Happens During Build

1. **Setup Phase**: Installs Node.js 23 and pnpm 9
2. **Install Phase**: Installs all dependencies
3. **Build Phase**:
   - Compiles TypeScript frontend
   - Builds Vite production bundle
   - Compiles TypeScript backend
4. **Start Phase**: Starts the Express server on the assigned PORT

## File Structure After Build

```
/
├── dist/                    # Frontend build (served by Express)
│   ├── index.html
│   ├── assets/
│   └── ...
├── server/
│   ├── dist/               # Backend build
│   │   └── index.js        # Entry point
│   └── src/
│       └── data/           # JSON database files
│           ├── invitations.json
│           └── comments.json
```

## API Endpoints

Once deployed, your API will be available at:

- `GET /health` - Health check
- `GET /api/invitations/:name` - Get invitation by name
- `GET /api/comments/:invitationId` - Get comments (with pagination)
- `POST /api/comments/:invitationId` - Create a new comment

## Accessing Your Application

After deployment, your application will be available at your configured domain:

```
https://your-domain.com/invitation/akin-nafisah?to=GuestName
```

## Troubleshooting

### Build fails
- Check the Coolify build logs
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation errors

### Server doesn't start
- Check if PORT is properly set by Coolify
- Verify the start command in nixpacks.toml
- Check server logs in Coolify

### API not working
- Verify the server is running on the correct port
- Check if `/health` endpoint responds
- Review server logs for errors

### Frontend shows blank page
- Check browser console for errors
- Verify the build created `dist/index.html`
- Check if static files are being served correctly

## Data Persistence

The application uses JSON files for data storage located at:
- `server/src/data/invitations.json`
- `server/src/data/comments.json`

**Important**: These files will be reset on each deployment. For persistent data, consider:
1. Using Coolify's persistent volumes
2. Migrating to a proper database (PostgreSQL, MongoDB, etc.)
3. Using environment variables for configuration

## Adding Persistent Storage (Optional)

To persist the JSON database across deployments in Coolify:

1. In Coolify, add a **Persistent Volume**:
   - Source: `/app/server/src/data`
   - Destination: `/persistent/data`

2. Update `server/src/controllers/comment.controller.ts` to use the persistent path

## Updating Your Application

To deploy updates:

1. Make your changes locally
2. Test locally with `pnpm run dev` and `pnpm run server`
3. Commit and push to Git
4. Coolify will automatically rebuild and deploy

## Manual Testing

Test the build locally before deploying:

```bash
# Build everything
pnpm build

# Start the production server
pnpm start

# Access at http://localhost:3001
```
