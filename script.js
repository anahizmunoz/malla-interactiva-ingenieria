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
                    div.innerHTML = `<strong>${ramo.codigo}</strong><br>${ramo.nombre}<br><small class="nota">${ramo.nota || ""}</small>`;

                    const estado = estadoGuardado[ramo.codigo] || ramo.estado;
                    div.classList.add(estado);
                    
                    if (estado === "aprobado") div.querySelector(".nota").textContent = ramo.nota;

                    div.onclick = () => {
                        const nota = prompt("¿Con qué nota aprobaste este ramo?", ramo.nota || "");
                        if (nota) {
                            div.className = "ramo aprobado";
                            div.querySelector(".nota").textContent = nota;
                            estadoGuardado[ramo.codigo] = "aprobado";
                            localStorage.setItem("estadoMalla", JSON.stringify(estadoGuardado));
                        }
                    };

                    contenedor.appendChild(div);
                });
            });
        });
});