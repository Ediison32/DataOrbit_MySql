

const form = document.getElementById('empleado_form'); // formulario 
const button_modal = document.getElementById('button_form'); // modal 
const table = document.getElementById('tabla-empleados'); // tabla formulario 
let editMode = false;
let editId= null;
// const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
       

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
        if (editMode) {
        // Actualizar
        alertify.confirm(`Are you sure you want to update?`,
            () => actualizar(formDAta, editId),
                
            () => alertify.error('Cancel')
        );
        } else {
            // Crear
            addEmpleado(formDAta);
    }
        
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
                <td><button  type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id='btnUpdate'>Update</button>
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

// para poder usar los botones de actualizar y crear es necesario usar un metodo ya
//que en momento de cargar el docuento los id de los botonoes no existen 

const on= (element, event, selector, handler)=>{
    element.addEventListener(event, e=>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
};

// despues podemos depurar cada parte 

// actualizar // editar 
on(document, "click", '#btnUpdate', e=>{
    const fila = e.target.closest('tr');

    editMode = true;
    editId = fila.children[0].innerHTML;
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide(); 
    // Llenar formulario con datos existentes
    form.name.value = fila.children[1].innerHTML;
    form.first.value = fila.children[2].innerHTML;
    form.second.value = fila.children[3].innerHTML;
    form.email.value = fila.children[4].innerHTML;
    form.charges.value = fila.children[5].innerHTML;
    form.salary.value = fila.children[6].innerHTML;
    form.city.value = fila.children[7].innerHTML;
    form.age.value = fila.children[8].innerHTML;


    // const fila = e.target.parentNode.parentNode;
    // const id= fila.children[0].innerHTML;
    // const namef= fila.children[1].innerHTML;
    // const first_namef= fila.children[2].innerHTML;
    // const second_namef= fila.children[3].innerHTML;
    // const emailf= fila.children[4].innerHTML;
    // const chargef= fila.children[5].innerHTML;
    // const salaryf= fila.children[6].innerHTML;
    // const cityf = fila.children[7].innerHTML;
    // const agef= fila.children[8].innerHTML;
    
    // table.innerHTML =''
    // aqui añado informacion para editar en elmismo modal 
    // form.name.value = namef;
    // form.first.value = first_namef;
    // form.second.value = second_namef;
    // form.email.value = emailf;
    // form.charges.value = chargef;
    // form.salary.value = salaryf;
    // form.city.value = cityf;
    // form.age.value = agef;
    
    // pregunto si esta seguro q quiere actualizar 
    // form.addEventListener('submit', (e)=>{
    // e.preventDefault();
    // const formDAta= {
    //         name : form.name.value.trim(),
    //         first_name: form.first.value.trim(),
    //         second_name:form.second.value.trim(),
    //         email:form.email.value.trim(),
    //         charge: form.charges.value.trim(),
    //         salary: form.salary.value.trim(),
    //         city : form.city.value.trim(),
    //         age:form.age.value.trim(),
    //     }

    //     console.log("entro a actualizar ", formDAta);
    //     alertify.confirm(`Are you sure you want to update?`,
    //         function(){
    //             //funcion para actualizar 
    //             console.log("entro a actualizar ", formDAta, id);

    //             actualizar(formDAta, id)
    //         },
    //         function(){
    //             alertify.error('Cancel');
                
    //         });
        
        
    // });
   

    
});

async function actualizar(data, id) {
    try {
        const res = await fetch(`http://localhost:3000/employee/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Error al actualizar');

        await res.json();
        alertify.success('Updated successfully');
         editMode = false;
        form.reset(),
   
        bootstrap.Modal.getInstance(document.getElementById('staticBackdrop')).hide();
        cargarEmpleados();
    } catch (err) {
        console.error(err);
        alertify.error('Error updating');
    }
}


// async function  actualizar(data, id) {
//      try{
//         const respose = await fetch(`http://localhost:3000/employee/${id}`,{
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json'},
//             body : JSON.stringify(data)
//         }
//         );
//         if(!respose.ok){
//             console.log("aglo paso ");
//         }else{
//             const data = await respose.json();
//             cargarEmpleados()

//         }
//     }catch(err){
//         console.log("erro al eliminar ");
        
//     }
// }



//para el boton de eliminar 

on(document, "click", '#btnDelete', e=>{
    // capturamos la informacion de la fila
    const fila = e.target.parentNode.parentNode;
    //aqui filtro y saco el id limpio 
    const id = fila.firstElementChild.innerHTML;
  
    const name = fila.children[1].innerHTML;
    console.log(name);
    
    alertify.confirm(`Are you sure you want to delete this user ${name}?`,
    async function(){
        try{
            const respose = await fetch(`http://localhost:3000/employee/${id}`,{
                method: 'DELETE'
            }
            );
            if(!respose.ok){
                console.log("aglo paso ");
            }else{
                const data = await respose.json();

            }
        }catch(err){
            console.log("erro al eliminar ");
            
        }
        cargarEmpleados();
        alertify.success('Ok');
    },
    function(){
        alertify.error('Cancel');
    });
    
})




// funcion de mostrar clientes de la db
cargarEmpleados()