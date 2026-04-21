FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine AS backend

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy frontend build to backend static folder
COPY --from=frontend-builder /app/frontend/dist ./public

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
