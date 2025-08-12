
// import all requere
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db =  require('./db/db.js'); // llame la funcion 

// create a new main

const app = express();

app.use(cors());

// aqui oye cuando llega informacion en formato js y lo convierte a objeto js

app.use(bodyParser.json());

// here runing the server. 



// mostrar todos los empleados 
app.get('/employee', (req, res)=>{
    // in sql i put the query for that request
    try{
        const table ='employee'
        const sql = `SELECT * FROM ${table} LIMIT 10`;
        //creat a request at db 
      
        db.query(sql,(err, response)=>{
            if(err){
                return res.status(500).json({error: `error get employee`})
            }
            res.json(response);
        })
    }catch(erro){
        console.error(erro)
    }
});


// metodo post para agregar informacion a la base de datos apenas el front le haga una petcion 
app.post('/employee',  (req, res)=>{
    try{
        const {name, first_name, second_name, email, charge, salary, city, age} = req.body; // desesctructuro el body
        console.log(name, first_name,second_name, email,charge, salary,city, age);
        
        const sql = `INSERT INTO employee(Name, LastName, LastName2, email, charge, salary, city,age)
                    VALUES(?,?,?,?,?,?,?,?)`;

        db.query(sql, [name, first_name, second_name, email, charge, salary,city, age], (err, result)=>{

            if(err){
                console.log("errorrrrr mircoles ", err);
                
            }else{

                res.status(201).json({ mensaje: "Empleado agregado correctamente" });
                console.log("MELO MELO ");
            }

        })
        
        // .then(()=>{
        //     res.status(201).json({mensaje: "agregado correctamete  "})
        // })
                    
    }catch(err){
        console.error("erro al intentar insertar ", err);
        
    }
})

// funcion acutalizar
app.put('/employee/:id',(req, res)=>{

    try{
        
        const {id} = req.params;
        console.log(id);
        
        const {name, first_name, second_name, email, charge, salary, city, age}= req.body;
        console.log(name, first_name,second_name, email,charge, salary,city, age);
        
        const table = 'employee'
        const sql = `UPDATE ${table}
                    SET Name=?, LastName=?, LastName2=?, email=?, charge=?, salary=?, city=?,age=?
                    WHERE id_Employee =? `
        db.query(sql,  [name, first_name, second_name, email, charge, salary,city, age,id], (err, result)=>{
            if(err){
                console.error("el esroro es ", err);
            }else{
                res.json({ mensaje: 'Usuario actualizado', filasAfectadas: result.affectedRows });
            }
        })
    }catch(err){
        console.error("erro al intentar acutalizar ");
        
    }
   
    
});



//funcio eliminar id 
app.delete('/employee/:id', (req, res)=>{
    try{
        const {id}= req.params;
        console.log(id);
        
        const sql = 'DELETE FROM  employee WHERE id_Employee =?';
        db.query(sql, [id], (err, resul)=>{
            if(err){
                console.error("SAlio un error al inteertar eliminar ", err);
                
            }else{
                res.json({ mensaje: 'Usuario Eliminado'});
            }
        })
    }catch(erro){
        console.log("error");
        
    }
});








// correr el servidor 

app.listen(3000, ()=>{
    console.log("server runing");
    
});
