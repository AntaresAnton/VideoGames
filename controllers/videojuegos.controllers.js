// Obtenemos el metodo Router de express
const database = require('../config/basedatos');
const { httpError } = require('../utils/error');
const { obtenerData } = require('../middlewares/auth');
const { matchedData } = require('express-validator');
//CONTROLADORES
const obtenerVideoJuegos = async (req, res) => {

    try {
        const db = await database();

        const sql = `
        SELECT 
                v.id_game,
                v.titulo,
                v.descripcion,
                v.id_plat
            FROM videojuegos v
        `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        httpError(res, "ERROR_GET_videojuegos");
    }
}
//  METODO PARA AGREGAR UNA videojuegos
const agregarVideoJuego = async (req, res) => {

    try {
        const body = matchedData(req);
        const { titulo, descripcion,  id_plat } = req.body;
        const token = req.headers.authorization;
        const { usuario } = obtenerData(token.split(" ").pop());
        const id_usuario = usuario.id;
        const db = await database();
        const sql = `
            INSERT INTO videojuegos(titulo, descripcion, id_plat, id_user)
            VALUES('${titulo}', '${descripcion}', '${id_plat}', ${id_usuario})
        `;
        const [resultado] = await db.query(sql);
        if (!resultado.insertId) {
            return res.json(
                {
                    "ok": false,
                    "msj": "no creaste nada de la videojuegos"
                }
            );
        }
        res.json(
            {
                "ok": true
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_POST_videojuegos")
    }
}
//  METODO PARA OBTENER UNA videojuegos POR ID 
const obtenerVideoJuego = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await database();
        const sql = `
        SELECT 
                v.id_game,
                v.titulo,
                v.descripcion,
                v.id_plat
            FROM videojuegos v
        WHERE r.id_game = ${id}
    `;
        const [rows] = await db.query(sql);
        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_DATO-DE-LA-videojuegos")
    }
}
//  METODO PARA OBTENER UNA VIDEO JUEGO  POR NOMBRE
const obtenerVideoJuegoNombre = async (req, res) => {
    try {
        const { name } = req.params;
        const db = await database();
        const sql = `
        SELECT 
                v.id_game,
                v.titulo,
                v.descripcion,
                v.id_plat
            FROM videojuegos v
            INNER JOIN plataforma p ON p.id_plat = v.id_plat
        WHERE p.nombre like '${name}%'

    `;
       //EJECUTAMOS LA CONSULTA 
       const [rows] = await db.query(sql);
       res.json(
           {
               "ok": true,
               data: rows
           }
       );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-DE-LA-videojuegos-BUSQUEDA-POR-PLATAFORMA-POR-NOMBRE")
    }
}
//  METODO PARA EDITAR UNA videojuegos
const editarVideoJuego = async (req, res) => {

    try {
        const { id } = req.params;
        const body = matchedData(req);
        const { titulo, descripcion, id_plat} = req.body;
        const db = await database();
        const sql = `
            UPDATE videojuegos SET
                titulo = '${titulo}',
                descripcion = '${descripcion}',
                id_plat = '${id_plat}'
            WHERE id_game = ${id}
        `;
        //EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);        
        if (!resultado.affectedRows) {
            return httpError(res, "Error al Editar videojuegos");
        }
        //RETORNAMOS LA RESPUESTA
        return res.json({
            "ok": true,
            "msj": "Se edito correctamente  la videojuegos"
        });

    } catch (error) {
        return httpError(res, "Error al editar videojuegos");
    }
}
// METODO PARA ELIMINAR UNA videojuegos
const eliminarVideoJuego = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM videojuegos WHERE id_game = ${id}`;
        const [resultado] = await db.query(sql);

        if (!resultado.affectedRows) {
            return httpError(res, "No se pudo eliminar nada de la videojuegos");
        }

        return res.json(
            {
                "ok": true,
                "msj": "videojuegos fue eliminada correctamente"
            }
        )

    } catch (error) {
        return httpError(res, "ERROR EN DELETE videojuegos");
    }
}
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = { 
    obtenerVideoJuegos,
    obtenerVideoJuego,
    obtenerVideoJuegoNombre,
    agregarVideoJuego,
    editarVideoJuego,
    eliminarVideoJuego                
}   