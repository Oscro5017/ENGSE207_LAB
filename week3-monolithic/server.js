const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./database/tasks.db', (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
    }
});

app.get('/api/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching tasks:', err.message);
            res.status(500).json({ error: 'Failed to fetch tasks' });
        } else {
            res.json({ tasks: rows });
        }
    });
});

app.get('/api/tasks/:id', (req, res) => {
    const sql = 'SELECT * FROM tasks WHERE id = ?';

    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch task' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(row);
    });
});

app.post('/api/tasks', (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }

    const sql = `
        INSERT INTO tasks (title, description, status, priority)
        VALUES (?, ?, 'TODO', ?)
    `;

    db.run(sql, [title, description || '', priority || 'MEDIUM'], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to create task' });
        }
        res.status(201).json({
            message: 'Task created',
            taskId: this.lastID
        });
    });
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const updates = [];
    const values = [];

    if (title !== undefined) {
        updates.push('title = ?');
        values.push(title);
    }
    if (description !== undefined) {
        updates.push('description = ?');
        values.push(description);
    }
    if (status !== undefined) {
        updates.push('status = ?');
        values.push(status);
    }
    if (priority !== undefined) {
        updates.push('priority = ?');
        values.push(priority);
    }

    if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    values.push(id);

    db.run(sql, values, function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to update task' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task updated' });
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';

    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete task' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    });
});

app.patch('/api/tasks/:id/status', (req, res) => {
    const { status } = req.body;
    const valid = ['TODO', 'IN_PROGRESS', 'DONE'];

    if (!valid.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    const sql = 'UPDATE tasks SET status = ? WHERE id = ?';

    db.run(sql, [status, req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to update status' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Status updated' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Task Board application started`);
    console.log(`📊 Architecture: Monolithic`);
});

process.on('SIGINT', () => {
    console.log('\n⚠️ Shutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
        process.exit(0);
    });
});