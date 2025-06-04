# Stage 1: build frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend ./frontend
RUN cd frontend && npm ci && npm run build

# Stage 2: serve static build
FROM nginx:1.25-alpine
COPY --from=builder /app/frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 