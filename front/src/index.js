
const form = document.getElementById('empleado_form'); // formulario 
const button_modal = document.getElementById('button_form'); // modal 
const table = document.getElementById('tabla-empleados'); // tabla formulario 
const btnDelete = document.getElementById('btnDelete');
const btnUpdate = document.getElementById('btnUpdate');


// capturo la informacion del formulario
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formDAta= {
            name : form.name.value.trim(),
            first_name: form.first.value.trim(),
            second_name:form.second.value.trim(),
            email:form.email.value.trim(),
            charge: form.charges.value.trim(),
            salary: form.salary.value.trim(),
            city : form.city.value.trim(),
            age:form.age.value.trim(),
        }
        console.log("VA A LLAMAR ADD EMPLEASO ",formDAta);
        addEmpleado(formDAta);
        
        
    });


// capturo cuando el cliente hace click para guardar la informacion del modal 
button_modal.addEventListener("click", ()=>{
    console.log("click");
    form.requestSubmit();
});


// funcion para hacer peticion al back el cual hace la peticion  a la db
async function cargarEmpleados(){
    try {
        const response = await fetch('http://localhost:3000/employee')
        
        if(!response.ok){
            console.error(" ocuarrio un eror en mostar ");

        }
        const data = await response.json();
        console.log(data);
        table.innerHTML = '';

        data.forEach(element => {
            table.innerHTML +=`
            <tr>
                <td>${element.id_Employee}</td>
                <td>${element.Name}</td>
                <td>${element.LastName}</td>
                <td>${element.LastName2}</td>
                <td>${element.email}</td>
                <td>${element.charge}</td>
                <td>${element.salary}</td>
                <td>${element.city}</td>
                <td>${element.age}</td>
                <td><button type="button" class="btn btn-primary" id='btnUpdate'>Update</button>
                 <button type="button" class="btn btn-danger" id='btnDelete'>Delete</button></td>
                
            </tr>
            
            `;
        });

        
    }catch(err){
        console.error("error ");
        
    }
};


// funcion post a backen para que agrege a una persona en la db  
async function addEmpleado(data){
    console.log("Entroa enviar empleaso ", data );
    
    try{

        const res = await fetch('http://localhost:3000/employee',{
            method : 'POST', // le defino el tipo de metodo 
            headers: { 'Content-Type': 'application/json'},
            body : JSON.stringify(data)
        });

        const body = await res.json();
        if (!res.ok) {
        // Mostrar error amigable
        alert(body.error || 'Server error');
        return;
        }

        //close the modal and clear data 
        alertify.message('ADD whit exit');
           


        form.reset(); // clear data 
        const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide(); // close modal 

    }catch(err){

    }
}

// funcion para eliminar una persona 


// funcion para actualizar datos de una persona



// funcion de mostrar clientes de la db
cargarEmpleados()