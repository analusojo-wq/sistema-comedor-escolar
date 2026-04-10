import { db } from "./firebase.js";

import {

collection,
addDoc,
getDocs,
query,
where

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const boton = document.getElementById("btnRegistrar");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const lista = document.getElementById("lista");
const exportar = document.getElementById("btnExportar");


boton.addEventListener("click", registrar);
exportar.addEventListener("click", exportarCSV);


async function registrar(){

let cedula = document.getElementById("cedula").value;
let nombre = document.getElementById("nombre").value;

if(cedula === "" || nombre === ""){

mensaje.innerText="⚠️ Complete todos los campos";
return;

}

let hoy = new Date().toISOString().split("T")[0];


const q = query(

collection(db,"registros"),

where("cedula","==",cedula),
where("fecha","==",hoy)

);

const resultado = await getDocs(q);

if(!resultado.empty){

mensaje.innerText="🚫 Este estudiante ya almorzó hoy";
return;

}

await addDoc(collection(db,"registros"),{

cedula: cedula,
nombre: nombre,
fecha: hoy

});


mensaje.innerText="✅ Almuerzo registrado";

document.getElementById("cedula").value="";
document.getElementById("nombre").value="";

cargarDatos();

}



async function cargarDatos(){

let hoy = new Date().toISOString().split("T")[0];

const q = query(

collection(db,"registros"),

where("fecha","==",hoy)

);

const snapshot = await getDocs(q);

contador.innerText = "Almuerzos hoy: " + snapshot.size;

lista.innerHTML="";

snapshot.forEach(doc => {

let data = doc.data();

let li = document.createElement("li");

li.textContent = data.nombre + " - " + data.cedula;

lista.appendChild(li);

});

}



async function exportarCSV(){

let hoy = new Date().toISOString().split("T")[0];

const q = query(

collection(db,"registros"),

where("fecha","==",hoy)

);

const snapshot = await getDocs(q);

let csv="Nombre,Cedula,Fecha\n";

snapshot.forEach(doc=>{

let data = doc.data();

csv += data.nombre + "," + data.cedula + "," + data.fecha + "\n";

});

let blob = new Blob([csv],{type:"text/csv"});

let link=document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download="almuerzos_hoy.csv";

link.click();

}


cargarDatos();