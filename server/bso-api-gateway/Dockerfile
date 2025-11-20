FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Create log directory
RUN mkdir -p /var/log/nginx

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 