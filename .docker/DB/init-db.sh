#!/bin/bash
set -e

# Создаем пользователя и базу данных
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE bnovo_test;
    CREATE USER bnovo_test_user WITH PASSWORD 'bnovo123456';
    GRANT ALL PRIVILEGES ON DATABASE bnovo_test TO bnovo_test_user;
    ALTER USER bnovo_test_user WITH CREATEDB;
EOSQL
