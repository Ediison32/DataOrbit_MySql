
// import all requere

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
    console.log("HOLA DESDE EL BACKET ");
    
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


// correr el servidor 

app.listen(3000, ()=>{
    console.log("server runing");
    
});
