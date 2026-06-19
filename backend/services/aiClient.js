const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001';

async function analyzeTask(title, description = '') {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/analyze`, {
            text: title,
            description: description
        });
        return response.data; // { priority, category }
    } catch (error) {
        console.error('Ошибка вызова Python-сервиса:', error.message);
        // Возвращаем значения по умолчанию
        return { priority: 'low', category: 'general' };
    }
}

module.exports = { analyzeTask };