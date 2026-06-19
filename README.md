# AI Task Manager

Система управления задачами с автоматическим AI-анализом приоритета и категорие.

## Стек технологий
- **Frontend:** React + JavaScript (порт 3000)
- **Backend:** Node.js + Express (порт 3001)
- **База данных:** PostgreSQL
- **AI-сервис:** Python + Flask (порт 5001)


## Структура проекта
*ai-task-manager/*
*├── backend/ # Node.js REST API*
*│ ├── db/ # SQL-скрипты и подключение к БД*
*│ ├── middleware/ # JWT-авторизация*
*│ ├── routes/ # Маршруты (auth, tasks)*
*│ ├── services/ # Клиент для вызова AI-сервиса*
*│ └── server.js # Главный файл сервера*
*├── frontend/ # React-приложение*
*│ └── src/*
*│ ├── components/ # Login, Register, Dashboard*
*│ ├── context/ # AuthContext (JWT)*
*│ └── services/ # API-клиент (axios)*
*└── ai-service/ # Python-сервис анализа текста*
*├── app.py # Flask-сервер*
*└── export_tasks.py # Скрипт выгрузки в CSV*



## Как запустить

### 1. База данных (PostgreSQL)
```bash
psql -U postgres -c "CREATE DATABASE ai_task_manager;"
psql -U postgres -d ai_task_manager -f backend/db/init.sql