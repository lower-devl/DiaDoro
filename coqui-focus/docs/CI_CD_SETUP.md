# CI/CD Setup Guide

## Overview
This project uses GitHub Actions for CI/CD and Vercel for hosting.

## Required GitHub Secrets

Configure these secrets in your GitHub repository:

| Secret | Description | How to Obtain |
|--------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel API token | [Vercel Settings → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel organization ID | Run `vercel teams list` or check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Vercel project ID | Run `vercel project ls` or check `.vercel/project.json` |

## Setting Up Vercel

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login and Initialize
```bash
cd coqui-focus
vercel login
vercel link
```

### 3. Get Project IDs
After linking, check `.vercel/project.json`:
```json
{
  "orgId": "your-org-id",
  "projectId": "your-project-id"
}
```

### 4. Generate Token
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it "GitHub Actions"
4. Copy the token

### 5. Configure GitHub Secrets
1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add the three secrets above

## Workflow Triggers

- **Pull Requests**: Quality checks run on PRs to main
- **Push to main**: Quality checks + Production deploy

## Local Testing

Test the workflow locally with [act](https://github.com/nektos/act):
```bash
# Install act
brew install act

# Run quality check job
act -j quality-check
```

## Troubleshooting

### Build fails
- Ensure `npm run build` works locally
- Check Node.js version matches (20.x)

### Deploy fails
- Verify secrets are correctly set
- Check Vercel project exists and is linked
- Ensure token has proper permissions
