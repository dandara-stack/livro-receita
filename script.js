document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-receita");
  const pesquisa = document.getElementById("pesquisa");
  const container = document.getElementById("receitas-container");

  // Carregar receitas do localStorage
  let receitas = JSON.parse(localStorage.getItem("receitas")) || [];

  // Função para exibir receitas
  function exibirReceitas(filtro = "") {
    if (!container) return; // Verifica se o container existe
    container.innerHTML = "";
    const filtradas = receitas.filter((r) =>
      r.titulo.toLowerCase().includes(filtro.toLowerCase())
    );
    filtradas.forEach((receita, index) => {
      const div = document.createElement("div");
      div.className = "receita";
      div.innerHTML = `
                <h3>${receita.titulo}</h3>
                <p><strong>Ingredientes:</strong></p>
                <ul>${receita.ingredientes
                  .map((i) => `<li>${i}</li>`)
                  .join("")}</ul>
                <p><strong>Modo de Preparo:</strong></p>
                <p>${receita.modoPreparo}</p>
                <button onclick="removerReceita(${index})">Remover</button>
            `;
      container.appendChild(div);
    });
  }

  // Adicionar receita (apenas se o formulário existir)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const titulo = document.getElementById("titulo").value;
      const ingredientes = document
        .getElementById("ingredientes")
        .value.split("\n")
        .filter((i) => i.trim());
      const modoPreparo = document.getElementById("modo-preparo").value;

      // Validação dos campos
      if (!titulo || ingredientes.length === 0 || !modoPreparo) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
      }

      // Adicionar nova receita
      receitas.push({ titulo, ingredientes, modoPreparo });

      // Salvar no localStorage
      localStorage.setItem("receitas", JSON.stringify(receitas));

      // ⭐⭐ ALERTA DE CONFIRMAÇÃO ⭐⭐
      alert("⭐⭐ Receita cadastrada com sucesso!⭐⭐");

      // Atualizar a exibição
      exibirReceitas();

      // Limpar o formulário
      form.reset();
    });
  }

  // Pesquisa (apenas se o campo existir)
  if (pesquisa) {
    pesquisa.addEventListener("input", () => {
      exibirReceitas(pesquisa.value);
    });
  }

  // Remover receita
  window.removerReceita = (index) => {
    if (confirm("Tem certeza que deseja remover esta receita?")) {
      receitas.splice(index, 1);
      localStorage.setItem("receitas", JSON.stringify(receitas));
      exibirReceitas();
      alert("Receita removida com sucesso!");
    }
  };

  // Exibir inicial
  exibirReceitas();
});
