# Use Gitpod's official Node.js base image (includes Git, Node.js, npm, yarn, pnpm, and Zsh)
FROM gitpod/workspace-node:latest

# Switch to root to perform package installations
USER root

# Install standard global build tools and dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt-get/lists/*

# Switch back to the non-root gitpod user
USER gitpod

# Ensure Node.js and global package directories have proper permissions
ENV PATH=/home/gitpod/.nvm/versions/node/$(node -v)/bin:$PATH

# Pre-install workspace utilities or global CLI packages if needed
RUN npm install -g svgo
