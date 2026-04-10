import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const exportar = document.getElementById("btnExportar");

/* Revisar si ya estaba logueado */

window.onload = function(){

if(localStorage.getItem("adminLogueado") === "true"){

document.getElementById("login").style.display="none";
document.getElementById("panel").style.display="block";

cargarDatos();

}

}

/* LOGIN */

window.login = function(){

let pass = document.getElementById("password").value;

if(pass === "admin123"){

localStorage.setItem("adminLogueado","true");

document.getElementById("login").style.display="none";
document.getElementById("panel").style.display="block";

cargarDatos();

}else{

alert("Contraseña incorrecta");

}

}

/* Cargar datos */

async function cargarDatos(){

let hoy = new Date().toISOString().split("T")[0];

const q = query(
collection(db,"registros"),
where("fecha","==",hoy)
);

const snapshot = await getDocs(q);

contador.innerText = "Almuerzos hoy: " + snapshot.size;

lista.innerHTML="";

snapshot.forEach(doc=>{

let data = doc.data();

let li = document.createElement("li");

li.textContent = data.nombre + " - " + data.cedula;

lista.appendChild(li);

});

}

/* Exportar CSV */

exportar.addEventListener("click", exportarCSV);

async function exportarCSV(){

let hoy = new Date().toISOString().split("T")[0];

const q = query(
collection(db,"registros"),
where("fecha","==",hoy)
);

const snapshot = await getDocs(q);

let csv = "Nombre,Cedula,Fecha\n";

snapshot.forEach(doc=>{

let data = doc.data();

csv += data.nombre + "," + data.cedula + "," + data.fecha + "\n";

});

let blob = new Blob([csv],{type:"text/csv"});

let link = document.createElement("a");

link.href = URL.createObjectURL(blob);
link.download = "almuerzos_hoy.csv";

link.click();

}

/* Cerrar sesión */

window.logout = function(){

localStorage.removeItem("adminLogueado");

location.reload();

}

/* Volver a estudiantes */

window.volver = function(){

window.location.href = "index.html";

}