# AI Task Manager

Система управления задачами с автоматическим AI-анализом приоритета и категории.

## Стек технологий
- **Frontend:** React + JavaScript (порт 3000)
- **Backend:** Node.js + Express (порт 3001)
- **База данных:** PostgreSQL
- **AI-сервис:** Python + Flask (порт 5001)

<img width="380" height="323" alt="image" src="https://github.com/user-attachments/assets/35f98303-2889-4dd4-b960-cf1f530864e3" />



## Как запустить

### 1. База данных (PostgreSQL)
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

Сервер запущен на http://localhost:3001

### 4. Frontend (React)
cd frontend
npm install
npm start

Приложение откроется на http://localhost:3000

## Проверка работы
1. Откройте http://localhost:3000
2. Зарегистрируйтесь (вкладка Register)
3. Войдите в систему (вкладка Login)
4. Создайте задачу (приоритет и категория определятся автоматически)
5. Измените статус через выпадающий список
6. Удалите задачу кнопкой Delete

## Экспорт задач в CSV
cd ai-service
python export_tasks.py


