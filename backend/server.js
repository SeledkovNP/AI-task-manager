require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(new Date().toISOString() + ' | ' + req.method + ' ' + req.url);
    next();
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'AI Task Manager API', status: 'running' });
});

app.listen(PORT, () => {
    console.log('==================================================');
    console.log('Backend server running on http://localhost:' + PORT);
    console.log('==================================================');
});
