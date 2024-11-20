# Stage 1: Build
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Строим проект для production
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы из builder-stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

# Устанавливаем только production-зависимости
RUN npm install --only=production

# Указываем порт, на котором приложение будет работать
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]