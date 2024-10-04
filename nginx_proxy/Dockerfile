# FROM --platform=linux/amd64 nginx
FROM nginx

COPY nginx_proxy/*.conf /etc/nginx/
RUN nginx -t
