import psycopg2
import csv
from datetime import datetime

# Настройки подключения
DB_HOST = "localhost"
DB_NAME = "ai_task_manager"
DB_USER = "postgres"
DB_PASSWORD = "van42"

try:
    # Подключение к БД
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    cursor = conn.cursor()

    # Запрос всех задач
    cursor.execute("SELECT id, user_id, title, description, status, priority, category, created_at FROM tasks ORDER BY id")

    # Получаем данные
    tasks = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]

    # Генерируем имя файла с датой
    filename = f"tasks_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

    # Сохраняем в CSV
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(columns)  # Заголовки
        writer.writerows(tasks)   # Данные

    print(f"Экспортировано {len(tasks)} задач в файл {filename}")

    cursor.close()
    conn.close()

except Exception as e:
    print(f"Ошибка: {e}")