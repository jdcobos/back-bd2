import {Router, Request, Response} from 'express';
import { CONNECT_ORACLE } from '../global/environment';
import oracledb, { NUMBER } from 'oracledb';

const router = Router();


router.post('/createTipoUsuario', async function (req, res)  {

    var TIPOS = req.body.TIPOS_USUARIOS_ID;
    var Are = req.body.AREA;
    console.log(req.body);
     oracledb.getConnection(CONNECT_ORACLE, async function (err, connection) {
        try {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        

        //INSERT  INTO TIPOS_USUARIOS (tipo_usuario_id,area)   VALUES (0, 'Compras');
           const  result = await connection.execute(
                'insert into TIPOS_USUARIOS (tipo_usuario_id, area) values (:TIPOS_USUARIOS_ID, :AREA)',
                { TIPOS_USUARIOS_ID: TIPOS, AREA: Are },
                { autoCommit: true} ); 
  
        
            console.log(result)
        
            res.status(200).json({
                status: false,
                code: 200,
                data: result
              });

        } catch (error) {
            res.status(400).json({
                status: false,
                code: 400,
                data: error
              });
        }
      
    });
     
   
});


router.get('/tipoUsuarios', function (req, res) {
    "use strict";

    oracledb.getConnection( CONNECT_ORACLE, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("SELECT * FROM TIPOS_USUARIOS", {}, {
            outFormat: oracledb.OUT_FORMAT_OBJECT  // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});





export default router;