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

        columna.appendChild(div);
    });

    contenedor.appendChild(columna);
});
