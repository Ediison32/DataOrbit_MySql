
// logica para proceoso csv

export const uploadCSV = ()=>{
    console.log("logica para procesar CSV");
    const  result =[];
    const filePath = Path.join(__dirname, 'mi archivo.csv');

    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row)=>{
        result.push(row);
    })

    result.forEach((empleado)=>{
        const query = `INSERT INTO  empleado(name, lastname, lastname2, email, charge, city, salary, age)  VALUES(?,?,?,?,?,?,?,?)`;
    });
    // insertar en la pantalla o html
    const values =[
        empleado.name,
        empleado.lastname,
        empleado.lastname2,
        empleado.email,
        empleado.charge,
        empleado.city,
        empleado.salary,
        empleado.age
    ];

    connection.query(query, values, (err, result)=>{
        if(err){
            console.error("error al insertar ");
            
        }else{
            console.log(`Empleado insertado ${result.insertId}` );
            
        }
    });
}


//module.exports = {uploadCSV};
