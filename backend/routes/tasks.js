const express = require('express');
const pool = require('../db/pool');
const authMiddleware = require('../middleware/auth');
const { analyzeTaskText } = require('../services/aiClient');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting tasks:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const { priority, category } = await analyzeTaskText(title, description || '');

        console.log('Creating task: "' + title + '" -> priority: ' + priority + ', category: ' + category);

        const result = await pool.query(
            'INSERT INTO tasks (user_id, title, description, priority, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [req.user.id, title, description || '', priority, category]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'in_progress', 'done'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const result = await pool.query(
            'UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [status, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;