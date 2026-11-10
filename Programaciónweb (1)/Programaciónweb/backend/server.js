
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'retro_store',
    port: 3306
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor de backend de Retro Store funcionando');
});

// GET: Obtener juegos desde MySQL
app.get('/api/juegos', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM juegos ORDER BY id ASC'
        );

        res.json(rows);

    } catch (error) {
        console.error('Error en la consulta GET:', error.message);

        res.status(500).json({
            error: 'Error al consultar la base de datos'
        });
    }
});

app.get('/prueba', (req, res) => {
    res.json({
        mensaje: 'Estoy ejecutando el server.js correcto'
    });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(
        `Servidor Backend escuchando en http://localhost:${PORT}`
    );
});
