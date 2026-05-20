CREATE DATABASE IF NOT EXISTS shop;
USE shop;
SOURCE /docker-entrypoint-initdb.d/seed.sql;
