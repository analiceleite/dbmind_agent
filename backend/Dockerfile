FROM denoland/deno:alpine

# Create app directory
WORKDIR /app

# Copy backend files
COPY ./backend .

# Cache dependencies and compile
RUN deno cache server.ts

EXPOSE 8000

# Run the server with required permissions
CMD ["run", "--allow-net", "--allow-env", "--allow-sys", "--allow-read", "--allow-write", "--no-check", "server.ts"]
