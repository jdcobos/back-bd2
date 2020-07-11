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


router.post('/createUsuario', async function (req, res)  {
 
    let documento = req.body.numeroDocuemto;
    let nomcomple = req.body.nombreCompletp;
    let priApell = req.body.primerApellido;
    let seguApell = req.body.segundoApellido;
    let fenacimiento = req.body.fechaNacimineto;
    let tipo_usuario = req.body.tipoUsuario;
    let tipo_documento = req.body.tipoDocumento;
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
                'insert into USUARIOS (documento,nombre_completo,primer_apellido,segundo_apellido,fecha_nacimiento,'+
                'tipo_usuario_id,tipo_documento_id)'
                +'values (:documento,:nombre_completo,:primer_apellido,:segundo_apellido,:fecha_nacimiento,'+
                ':tipo_usuario_id,:tipo_documento_id)',
                { documento:documento,
                  nombre_completo:nomcomple,
                  primer_apellido:priApell,
                  segundo_apellido:seguApell,
                  fecha_nacimiento:fenacimiento,
                  tipo_usuario_id:tipo_usuario,
                  tipo_documento_id:tipo_documento
                },
                { autoCommit: true} ); 
  
        
            console.log(result)
        
            res.status(200).json({
                status: false,
                code: 200,
                data: result
              });

        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: false,
                code: 400,
                data: error
              });
        }
    });
});



router.post('/createOrden', async function (req, res)  {
 
    var orden = req.body.OrdenID;
    var user = req.body.documento;
    var prod = req.body.referencia;
    var cant = req.body.cantidad;
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
    
        const  result = await connection.execute(
            'insert into ORDENES_DE_COMPRA (orden_de_compra_id,documento_id,referencia_id,cantidad) values (:orden_de_compra_id,:documento_id,:referencia_id,:cantidad)',
            { orden_de_compra_id: orden, documento_id: user, referencia_id:prod,cantidad:cant},
            { autoCommit: true} ); 
          
        console.log(result);
            res.status(200).json({
                status: false,
                code: 200,
                data: result
              });

        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: false,
                code: 400,
                data: error
              });
        }
    });
});



router.get('/tipoDocumentos', function (req, res) {
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
        connection.execute("SELECT * FROM TIPOS_DOCUMENTOS", {}, {
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



router.get('/usuarios', function (req, res) {
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
        connection.execute("SELECT * FROM USUARIOS", {}, {
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




router.get('/usuariosOrdenes', function (req, res) {
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
        connection.execute("SELECT * FROM USUARIOS where TIPO_USUARIO_ID = 0 ", {}, {
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





router.get('/referencias', function (req, res) {
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
        connection.execute("SELECT * FROM referencias ", {}, {
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






router.post('/deleteUsuarios', async function (req, res)  {
 
    let documento =  req.body.documento;
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



       
        const result = await connection.execute('DELETE FROM USUARIOS WHERE DOCUMENTO = :id', 
        { id:  documento}, {
          autoCommit: true
        })
        
            console.log(result)
        
            res.status(200).json({
                status: false,
                code: 200,
                data: result
              });

        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: false,
                code: 400,
                data: error
              });
        }
    });
});



export default router;