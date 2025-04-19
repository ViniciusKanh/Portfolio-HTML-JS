let allProjects = [];

// Carrega os projetos do JSON
async function getProjects() {
  try {
    const response = await fetch("projects.json");
    allProjects = await response.json();
    renderProjects("all"); // Exibe todos inicialmente
  } catch (error) {
    console.error("Erro ao carregar os projetos:", error);
  }
}

// Renderiza os projetos no container
function renderProjects(category) {
  const container = document.getElementById("projectsContainer");
  container.innerHTML = "";

  const filtered = category === "all"
    ? allProjects
    : allProjects.filter(p => p.category === category);

  filtered.forEach(project => {
    const html = `
      <div class="box tilt" style="width: 380px; margin: 1rem">
        <img draggable="false" src="${project.image}" alt="${project.name}" />
        <div class="content">
          <div class="tag"><h3>${project.name}</h3></div>
          <div class="desc">
            <p>${project.description}</p>
            <div class="btns">
              <a href="${project.live}" class="btn" target="_blank"><i class="fas fa-eye"></i> Ver Projeto</a>
              <a href="${project.code}" class="btn" target="_blank">Código <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>
      </div>`;
    container.insertAdjacentHTML("beforeend", html);
  });
}

// Torna a função acessível no HTML
window.filterProjects = function (category) {
  // Atualiza estado dos botões
  document.querySelectorAll("#filters .btn").forEach(btn =>
    btn.classList.remove("is-checked")
  );

  // Marca o botão ativo
  const btnClicked = [...document.querySelectorAll("#filters .btn")].find(btn =>
    btn.getAttribute("data-filter") === category
  );
  if (btnClicked) btnClicked.classList.add("is-checked");

  console.log("Filtrando categoria:", category);
  renderProjects(category);
};

// Executa quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  getProjects();
});
