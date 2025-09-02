const APP_NOMBRE = "Noticias Tecnológicas Sebas";
const APP_VERSION = "1.0.0";
const ANIO = 2025;

let contadorVisitas = 0;
let usuarioActivo = "Sebas";
let esMovil = /Mobi|Android/i.test(navigator.userAgent);

function sumar(a, b) { return a + b; }
function multiplicar(a, b) { return a * b; }

document.addEventListener("DOMContentLoaded", () => {
  const salida = document.querySelector("#salida");
  if (salida) salida.textContent = `Bienvenido ${usuarioActivo} a ${APP_NOMBRE} (v${APP_VERSION}) - Año ${ANIO}`;

  contadorVisitas = parseInt(localStorage.getItem("visitas")) || 0;
  actualizarVisitas();

  const btnVisitas = document.querySelector("#btnVisitas");
  if (btnVisitas) btnVisitas.addEventListener("click", incrementarVisitas);

  setInterval(mostrarHora, 1000);
  mostrarHora();

  activarNavegacion();

  conectarCambioColor();
  conectarNotas();
  conectarBuscadorServicios();
  validarFormularioContacto();
  conectarEvaluarNumero();
  conectarObtenerDia();
  renderizarPerfil();
  conectarFormatearMoneda();

  const spanAnio = document.querySelector("#anio");
  if (spanAnio) spanAnio.textContent = ANIO;
});

function incrementarVisitas() {
  contadorVisitas++;
  localStorage.setItem("visitas", contadorVisitas);
  actualizarVisitas();
}
function actualizarVisitas() {
  const totalVisitas = document.querySelector("#totalVisitas");
  if (totalVisitas) totalVisitas.textContent = contadorVisitas;
}

function mostrarHora() {
  const reloj = document.querySelector("#reloj");
  if (!reloj) return;
  const ahora = new Date();
  reloj.textContent = ahora.toLocaleTimeString();
}

function activarNavegacion() {
  const bodyPage = document.body.dataset.page;
  const links = document.querySelectorAll("nav a");
  if (links.length === 0) return;

  let activado = false;
  if (bodyPage) {
    links.forEach(a => {
      if (a.dataset.page === bodyPage) {
        a.classList.add("activo");
        activado = true;
      }
    });
  }
  if (!activado) {
    const actual = location.pathname.split("/").pop() || "index.html";
    links.forEach(a => {
      const href = a.getAttribute("href");
      if (href && href.endsWith(actual)) a.classList.add("activo");
    });
  }
}

function conectarCambioColor() {
  const caja = document.querySelector("#cajaColor");
  const aplicar = (color) => {
    if (caja) caja.style.backgroundColor = color;
    else document.body.style.backgroundColor = color;
  };
  const rojo = document.querySelector("#btnRojo") || document.querySelector("#rojo");
  const verde = document.querySelector("#btnVerde") || document.querySelector("#verde");
  const azul = document.querySelector("#btnAzul") || document.querySelector("#azul");
  if (rojo) rojo.addEventListener("click", () => aplicar("red"));
  if (verde) verde.addEventListener("click", () => aplicar("green"));
  if (azul) azul.addEventListener("click", () => aplicar("blue"));
}

function conectarNotas() {
  const input = document.querySelector("#notaInput");
  const btn = document.querySelector("#agregarNota");
  const lista = document.querySelector("#listaNotas");
  if (!input || !btn || !lista) return;
  const agregar = () => {
    const texto = input.value.trim();
    if (!texto) { alert("Escribe una nota válida"); return; }
    const li = document.createElement("li");
    li.textContent = texto;
    lista.appendChild(li);
    input.value = "";
  };
  btn.addEventListener("click", agregar);
  input.addEventListener("keydown", e => { if (e.key === "Enter") agregar(); });
}

function validarFormularioContacto() {
  const form = document.querySelector("#formContacto") || document.querySelector("main form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    const campos = form.querySelectorAll("input, textarea, select");
    campos.forEach(campo => {
      let error = campo.nextElementSibling;
      if (!error || !error.classList || !error.classList.contains("mensaje-error")) {
        error = document.createElement("span");
        error.className = "mensaje-error";
        campo.insertAdjacentElement("afterend", error);
      }
      if (campo.value.trim() === "") {
        valido = false;
        campo.classList.add("error");
        error.textContent = "Este campo es obligatorio";
      } else {
        campo.classList.remove("error");
        error.textContent = "";
      }
      if (campo.type === "email" && campo.value) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value);
        if (!ok) { valido = false; campo.classList.add("error"); error.textContent = "Correo inválido"; }
      }
    });

    if (valido) {
      const cajaOk = document.querySelector("#mensajeExito");
      if (cajaOk) cajaOk.textContent = "Formulario enviado con éxito ✅";
      else alert("Formulario enviado con éxito ✅");
      form.reset();
    }
  });
}

function conectarBuscadorServicios() {
  const input = document.querySelector("#buscarServicio") || document.querySelector("#buscador");
  const listaResultados = document.querySelector("#resultados");
  const itemsServicio = document.querySelectorAll(".servicio");
  if (!input) return;

  const filtrar = () => {
    const q = input.value.toLowerCase();
    if (itemsServicio.length) {
      itemsServicio.forEach(el => {
        el.style.display = el.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    } else if (listaResultados) {
      const lis = listaResultados.querySelectorAll("li");
      lis.forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    }
  };
  input.addEventListener("input", filtrar);
}

function conectarEvaluarNumero() {
  const input = document.querySelector("#numeroInput");
  const btn = document.querySelector("#btnEvaluar");
  const out = document.querySelector("#resultadoNumero");
  if (!input || !btn || !out) return;
  btn.addEventListener("click", () => {
    const n = Number(input.value);
    out.textContent = evaluarNumero(n);
  });
}
function evaluarNumero(n) {
  if (n > 0) return "Positivo";
  else if (n < 0) return "Negativo";
  else return "Cero";
}

function sumar() {
  const n1 = parseFloat(document.getElementById("num1").value) || 0
  const n2 = parseFloat(document.getElementById("num2").value) || 0
  document.getElementById("resultado").textContent = `Suma: ${n1 + n2}`
}

function multiplicar() {
  const n1 = parseFloat(document.getElementById("num1").value) || 0
  const n2 = parseFloat(document.getElementById("num2").value) || 0
  document.getElementById("resultado").textContent = `Multiplicación: ${n1 * n2}`
} 

const perfil = {
  nombre: "Sebastián",
  rol: "Desarrollador de Sistemas",
  descripcion: "Apasionado por la innovación, la IA y la tecnología."
};

const contenedorPerfil = document.querySelector("#perfil");
if (contenedorPerfil) {
  contenedorPerfil.innerHTML = `
    <h3>Perfil</h3>
    <p><strong>Nombre:</strong> ${perfil.nombre}</p>
    <p><strong>Rol:</strong> ${perfil.rol}</p>
    <p>${perfil.descripcion}</p>
  `;
}

function conectarObtenerDia() {
  const input = document.querySelector("#diaInput");
  const btn = document.querySelector("#btnDia");
  const out = document.querySelector("#resultadoDia");
  if (!input || !btn || !out) return;
  btn.addEventListener("click", () => {
    const n = parseInt(input.value);
    out.textContent = obtenerDia(n);
  });
}

function obtenerDia(numero) {
  switch (numero) {
    case 0: return "Domingo";
    case 1: return "Lunes";
    case 2: return "Martes";
    case 3: return "Miércoles";
    case 4: return "Jueves";
    case 5: return "Viernes";
    case 6: return "Sábado";
    default: return "Número inválido";
  }
}

class Util {
  static formatearMoneda(valor, moneda = "COP") {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: moneda }).format(valor);
  }
}

function conectarFormatearMoneda() {
  const input = document.querySelector("#montoInput");
  const btn = document.querySelector("#btnMoneda");
  const out = document.querySelector("#resultadoMoneda");
  if (!input || !btn || !out) return;

  btn.addEventListener("click", () => {
    const valor = parseFloat(input.value) || 0;
    out.textContent = Util.formatearMoneda(valor);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  conectarFormatearMoneda();
});

