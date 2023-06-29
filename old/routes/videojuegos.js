const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// lss req
// Config Conexión BD
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin', // contraseña base de datos usada
  database: 'videojuegosdb'
});

// Conexión bd
connection.connect(function(error) {
  if (error) {
    console.log('Error en la conexión kupó: ', error);
  }

  console.log('Conectado a la base de datos kupó...');
});

// Ruta para obtener todos los juegos disponibles en el catálogo, hay 0 de momento.
router.get('/', function(req, res) {
  connection.query('SELECT * FROM videojuegos', function(error, results) {
    if (error) {
        res.status(500).send({message: 'Error al obtener los juegos'});
      } else {
        res.status(200).send(results);
      }
    });
  });
  
  // Ruta para agregar jurgo nuevo.
  router.post('/', function(req, res) {
    const {titulo, plataforma, descripcion} = req.body;
    connection.query('INSERT INTO videojuegos SET ?', {titulo, plataforma, descripcion}, function(error, result) {
      if (error) {
        res.status(500).send({message: 'Error al agregar el juego :( '});
      } else {
        res.status(200).send({message: 'Juego agregado correctamente :)'});
      }
    });
  });
  
  // Ruta para actualizar un juego en los datos.
  router.put('/:id', function(req, res) {
    const {titulo, plataforma, descripcion} = req.body;
    const id = req.params.id;
    connection.query('UPDATE videojuegos SET titulo = ?, plataforma = ?, descripcion = ? WHERE id = ?', [titulo, plataforma, descripcion, id], function(error, result) {
      if (error) {
        res.status(500).send({message: 'Error al actualizar :('});
      } else {
        res.status(200).send({message: 'Juego actualizado :)'});
    }
  });
});

// Ruta para eliminar un juego de la bd.
router.delete('/:id', function(req, res) {
  const id = req.params.id;
  connection.query('DELETE FROM videojuegos WHERE id = ?', [id], function(error, result) {
    if (error) {
      res.status(500).send({message: 'Error al eliminar el juego :('});
    } else {
      res.status(200).send({message: 'Juego eliminado :)'});
    }
  });
});

module.exports = router;