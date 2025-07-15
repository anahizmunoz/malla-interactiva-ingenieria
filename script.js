document.addEventListener('DOMContentLoaded', () => {
    fetch('malla.json')
        .then(response => response.json())
        .then(data => {
            const mallaDiv = document.getElementById('malla');
            const aprobados = new Set(); // ramos aprobados para ir desbloqueando

            // Primero identificamos todos los ramos aprobados
            for (const semestre in data.semestres) {
                data.semestres[semestre].forEach(ramo => {
                    if (ramo.estado === 'aprobado') {
                        aprobados.add(ramo.codigo);
                    }
                });
            }

            for (const semestre in data.semestres) {
                const semestreDiv = document.createElement('div');
                semestreDiv.classList.add('semestre');

                const titulo = document.createElement('h2');
                titulo.textContent = `Semestre ${semestre}`;
                semestreDiv.appendChild(titulo);

                data.semestres[semestre].forEach(ramo => {
                    const ramoDiv = document.createElement('div');
                    ramoDiv.classList.add('ramo', ramo.tipo);

                    // Determina si está desbloqueado
                    const desbloqueado = ramo.prerrequisitos.every(prereq => aprobados.has(prereq));

                    if (ramo.estado === 'aprobado') {
                        ramoDiv.classList.add('aprobado');
                    } else if (!desbloqueado && ramo.prerrequisitos.length > 0) {
                        ramoDiv.classList.add('bloqueado');
                    } else if (ramo.estado === 'pendiente') {
                        ramoDiv.classList.add('pendiente');
                    }

                    // Contenido del ramo
                    ramoDiv.innerHTML = `
                        <strong>${ramo.codigo}</strong><br>
                        ${ramo.nombre}
                    `;

                    semestreDiv.appendChild(ramoDiv);
                });

                mallaDiv.appendChild(semestreDiv);
            }
        })
        .catch(error => console.error('Error al cargar la malla:', error));
});

