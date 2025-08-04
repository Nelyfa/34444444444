#!/bin/bash
set -e

# Проверяем, установлен ли Docker
if ! command -v docker &> /dev/null
then
    echo "Docker не установлен. Пожалуйста, установите Docker."
    exit 1
fi

# Собираем образ
echo "Собираем Docker-образ..."
docker build -t text-transformer-app .

# Останавливаем старый контейнер, если есть
docker stop text-transformer 2>/dev/null || true
docker rm text-transformer 2>/dev/null || true

# Запускаем контейнер на порту 83
echo "Запускаем приложение на порту 83..."
docker run -d --name text-transformer -p 83:83 text-transformer-app

echo "Готово! Откройте http://localhost:83"
