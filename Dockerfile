# Используем официальный образ Node.js
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и фронтенд
COPY backend ./backend
COPY frontend ./frontend

# Устанавливаем зависимости backend
WORKDIR /app/backend
RUN npm install

# Собираем production-версию frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Финальный образ
FROM node:18

WORKDIR /app

# Копируем backend
COPY --from=build /app/backend ./

# Копируем собранный frontend в папку backend/public
COPY --from=build /app/frontend/build ./public

# Устанавливаем зависимости (ещё раз для финального слоя)
RUN npm install

# Экспортируем порт 83
EXPOSE 83

# Запускаем backend
CMD ["node", "index.js"]
