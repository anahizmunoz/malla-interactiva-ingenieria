document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("malla");
    const estadoGuardado = JSON.parse(localStorage.getItem("estadoMalla")) || {};

    fetch("malla.json")
        .then(r => r.json())
        .then(data => {
            Object.entries(data.semestres).forEach(([semestre, ramos]) => {
                ramos.forEach(ramo => {
                    const div = document.createElement("div");
                    div.className = "ramo";
                    div.id = ramo.codigo;
                    div.innerHTML = `
                        <strong>${ramo.codigo}</strong><br>
                        ${ramo.nombre}<br>
                        <small class="nota">${ramo.nota || ""}</small>
                    `;

                    
                    const estadoRaw = estadoGuardado[ramo.codigo];
                    const estado = typeof estadoRaw === "string" ? estadoRaw : ramo.estado;
                    if (estado) {
                        div.classList.add(estado);
                    }

                    if (estado === "aprobado") {
                        div.querySelector(".nota").textContent = ramo.nota;
                    }

               
                    if (ramo.tipo) {
                        div.classList.add(ramo.tipo);
                    }

                    
                    const todosAprobados = ramo.prerrequisitos.every(prer =>
                        estadoGuardado[prer] === "aprobado"
                    );

                    if (!todosAprobados && ramo.prerrequisitos.length > 0) {
                        div.classList.add("bloqueado");
                        div.title = "Necesitas aprobar: " + ramo.prerrequisitos.join(", ");
                    }

                    
                    div.onclick = () => {
                        if (div.classList.contains("bloqueado")) return;

                        const nota = prompt("¿Con qué nota aprobaste este ramo?", ramo.nota || "");
                        if (nota) {
                            div.className = `ramo aprobado ${ramo.tipo}`;
                            div.querySelector(".nota").textContent = nota;
                            estadoGuardado[ramo.codigo] = "aprobado";
                            localStorage.setItem("estadoMalla", JSON.stringify(estadoGuardado));
                            location.reload(); 
                        }
                    };

                    contenedor.appendChild(div);
                });
            });
        });
});
