# Используем официальный образ PostgreSQL
FROM postgres:latest

# Устанавливаем переменные окружения для PostgreSQL
ENV POSTGRES_USER=bnovo_test_user
ENV POSTGRES_PASSWORD=bnovo123456
ENV POSTGRES_DB=bnovo_test

# Копируем скрипт для инициализации базы данных
COPY init-db.sh /docker-entrypoint-initdb.d/

# Устанавливаем права на выполнение скрипта
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh
