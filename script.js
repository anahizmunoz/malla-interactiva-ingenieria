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

                    
                    const guardado = estadoGuardado[ramo.codigo];
                    const estado = typeof guardado === "object" ? guardado.estado : guardado || ramo.estado;
                    const nota = typeof guardado === "object" ? guardado.nota : ramo.nota;

                    div.innerHTML = `<strong>${ramo.codigo}</strong><br>${ramo.nombre}<br><small class="nota">${nota || ""}</small>`;
                    div.classList.add(estado);

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

                    contenedor.appendChild(div);
                });
            });
        });
});
