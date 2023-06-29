const express = require('express');
const mysql = require('mysql');
const app = express();
// los req

// Configuración de la conexión BD
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', //  "contraseña" base de datos
  database: 'videojuegosdb'
});

// Conexión BD
connection.connect(function(error) {
  if (error) {
    console.log('Error al probar conexión: ', error);}

  console.log('Conectado correctamente a la base de datos...');
});

// Ruta para obtener todos el catálogo de la bd de juegos.
app.get('/videojuegos', function(req, res) {
  connection.query('SELECT * FROM videojuegos', function(error, results) {
    if (error) {
      res.status(500).send({message: 'Error al obtener los juegos :('});
    } else {
      res.status(200).send(results);
    }
  });
});

// Ruta para agregar juego nuevo.
app.post('/videojuegos', function(req, res) {
  const {titulo, plataforma, descripcion} = req.body;
  connection.query('INSERT INTO videojuegos SET ?', {titulo, plataforma, descripcion}, function(error, result) {
    if (error) {
      res.status(500).send({message: 'Error al agregar el juego :('});
    } else {
      res.status(200).send({message: 'Juego agregado :)'});
    }
  });
});

// Ruta para actualizar un juego existente en la BD.
app.put('/videojuegos/:id', function(req, res) {
  const {titulo, plataforma, descripcion} = req.body;
  const id = req.params.id;
  connection.query('UPDATE videojuegos SET titulo = ?, plataforma = ?, descripcion = ? WHERE id = ?', [titulo, plataforma, descripcion, id], function(error, result) {
    if (error) {
      res.status(500).send({message: 'Error al actualizar el juego :( '});
    } else {
      res.status(200).send({message: 'Juego actualizado :)'});
    }
  });
});

// Ruta para eliminar un juego existente en BD.
app.delete('/videojuegos/:id', (req, res)=> {
  const id = req.params.id;
  connection.query('DELETE FROM videojuegos WHERE id = ?', [id], function(error, result) {
    if (error) {
      res.status(500).send({message: 'Error al eliminar el juego :('});
    } else {
      res.status(200).send({message: 'Juego eliminado :) '});
    }
  });
});

// Puerto en el que asocia o se está listen/escuchando.
app.listen(4000, ()=> {
  console.log('La aplicación de videojuegos-api se está produciendo en el puerto 3000...');
});




