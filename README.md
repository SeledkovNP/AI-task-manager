# Уровень 2 (Middle / Strong Junior)
## Задача
Разработать AI Task Assistant.
Это система управления задачами с автоматическим анализом текста задач.


# AI Task Manager

Система управления задачами с автоматическим AI-анализом приоритета и категорие.

## Стек технологий
- **Frontend:** React + JavaScript (порт 3000)
- **Backend:** Node.js + Express (порт 3001)
- **База данных:** PostgreSQL
- **AI-сервис:** Python + Flask (порт 5001)

## Описание файлов проекта

### Корень проекта
| Файл | Описание |
|------|----------|
| `README.md` | Инструкция по запуску и описание проекта |
| `.gitignore` | Список файлов, не загружаемых в Гидхаб |

### Backend
| Файл | Описание |
|------|----------|
| `server.js` | Главный файл сервера. Подключает маршруты, middleware, запускает сервер на порту 3001 |
| `package.json` | Список зависимостей Node.js |
| `.env` | Переменные окружения (пароль Базы Данных, секретный ключ JWT, URL AI-сервиса) |
| `db/pool.js` | Настройка подключения к PostgreSQL |
| `db/init.sql` | SQL-скрипт для создания таблиц users и tasks |
| `middleware/auth.js` | Проверка JWT-токена. Блокирует доступ без авторизации |
| `routes/auth.js` | Маршруты регистрации и входа |
| `routes/tasks.js` | CRUD-маршруты для задач. При создании вызывает AI-сервис |
| `services/aiClient.js` | Отправляет текст задачи в Python-сервис и получает приоритет и категорию |

### AI-сервис
| Файл | Описание |
|------|----------|
| `app.py` | Flask-сервер. Принимает текст задачи, анализирует ключевые слова, возвращает приоритет и категорию |
| `export_tasks.py` | Скрипт для выгрузки всех задач из БД в CSV-файл |
| `requirements.txt` | Зависимости Python (flask, psycopg2) |

### Frontend
| Файл | Описание |
|------|----------|
| `src/App.js` | Главный компонент. Настройка маршрутов (логин, регистрация, панель задач) |
| `src/index.js` | Точка входа React-приложения |
| `src/services/api.js` | Настройка axios для запросов к backend (добавляет JWT-токен в заголовки) |
| `src/context/AuthContext.js` | Контекст авторизации (хранение токена, функции login/register/logout) |
| `src/components/Login.js` | Страница входа в систему |
| `src/components/Register.js` | Страница регистрации |
| `src/components/Dashboard.js` | Панель задач: создание, таблица, изменение статуса, удаление |


## Способ запуска

### 1. База данных построена на (PostgreSQL)
psql -U postgres -c "CREATE DATABASE ai_task_manager;"
psql -U postgres -d ai_task_manager -f backend/db/init.sql


### 2. AI-сервис (Python)
cd ai-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py

Сервис запущен на http://localhost:5001

### 3. Backend (Node.js)
cd backend
npm install
node server.js

Сервер запущен на http://localhost:3001 (Локалном стостояние)

### 4. Frontend (React)
cd frontend
npm install
npm start

Приложение откроется на http://localhost:3000  (Локалном стостояние)

## Способы проверка работы
1. Откройте http://localhost:3000
2. Зарегистрируйтесь (вкладка Register)
3. Войдите в систему (вкладка Login)
4. Создайте задачу (приоритет и категория определятся автоматически)
5. Измените статус через выпадающий список
6. Удалите задачу кнопкой Delete

## Экспорт задач в CSV
cd ai-service
python export_tasks.py



