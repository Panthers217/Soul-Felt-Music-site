# Soul Felt Music Dev Container
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-20

# Install PostgreSQL
USER root
RUN apt-get update && \
    apt-get install -y postgresql postgresql-contrib && \
    rm -rf /var/lib/apt/lists/*

# Expose PostgreSQL and frontend ports
EXPOSE 5432 3000

# Switch back to vscode user
USER vscode

# Default working directory
WORKDIR /workspaces/Soul-Felt-Music-site
