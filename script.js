document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("malla");
    const estadoGuardado = JSON.parse(localStorage.getItem("estadoMalla")) || {};

    fetch("malla.json")
        .then(r => r.json())
        .then(data => {
            Object.entries(data.semestres).forEach(([semestre, ramos]) => {
                const columna = document.createElement("div");
                columna.className = "semestre";

                const titulo = document.createElement("h2");
                titulo.textContent = `Semestre ${semestre}`;
                columna.appendChild(titulo);

                ramos.forEach(ramo => {
                    const div = document.createElement("div");
                    div.className = "ramo";
                    div.id = ramo.codigo;

                    const guardado = estadoGuardado[ramo.codigo];
                    const estado = typeof guardado === "object" ? guardado.estado : guardado || ramo.estado;
                    const nota = typeof guardado === "object" ? guardado.nota : ramo.nota;

                    div.innerHTML = `<strong>${ramo.codigo}</strong><br>${ramo.nombre}<br><small class="nota">${nota || ""}</small>`;
                    div.classList.add(estado);
                    if (ramo.tipo) {
                        div.classList.add(ramo.tipo); // ← Esto le agrega la clase visual
                    }

                    
                    div.onclick = () => {
                        const nuevaNota = prompt("¿Con qué nota aprobaste este ramo?", nota || "");
                        if (nuevaNota) {
                            div.className = "ramo aprobado";
                            div.querySelector(".nota").textContent = nuevaNota;
                            estadoGuardado[ramo.codigo] = {
                                estado: "aprobado",
                                nota: nuevaNota
                            };
                            localStorage.setItem("estadoMalla", JSON.stringify(estadoGuardado));
                        }
                    };

                    columna.appendChild(div);
                });

                contenedor.appendChild(columna);
            });
        });
});
