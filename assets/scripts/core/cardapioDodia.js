/**
 * Objeto global para gerenciar as funções do Cardápio do Dia
 * Compatível com o sistema de carrinho existente
 */

const cardapioDodia = {
  aumentarQuantidade(id) {
    const element = document.getElementById(`qntd-${id}`);
    if (!element) return;
    let qntdAtual = parseInt(element.textContent) || 0;
    element.textContent = qntdAtual + 1;
  },

  diminuirQuantidade(id) {
    const element = document.getElementById(`qntd-${id}`);
    if (!element) return;
    let qntdAtual = parseInt(element.textContent) || 0;
    if (qntdAtual > 0) {
      element.textContent = qntdAtual - 1;
    }
  },

  adicionarAoCarrinho(id, nome, preco, imagem) {
    const qntdElement = document.getElementById(`qntd-${id}`);
    if (!qntdElement) return;

    const qntd = parseInt(qntdElement.textContent) || 0;

    if (qntd <= 0) {
      // Mostrar mensagem
      if (typeof cardapio !== "undefined" && cardapio.metodos) {
        cardapio.metodos.mensagem("Selecione uma quantidade", "red");
      }
      return;
    }

    // Converter preço string para número
    const precoNum = parseFloat(preco.replace(",", "."));

    // Criar objeto do item compatível com o carrinho
    const item = {
      id: id,
      name: nome,
      price: precoNum,
      img: imagem,
      qntd: qntd,
      dsc: "",
      obs: [],
      peso: "350g",
      kcal: "~350",
    };

    // Adicionar ao carrinho (usar a função global)
    if (typeof meuCarrinho !== "undefined") {
      let existe = meuCarrinho.find((elem) => elem.id === id);

      if (existe) {
        existe.qntd += qntd;
      } else {
        meuCarrinho.push(item);
      }

      // Limpar quantidade
      qntdElement.textContent = "0";

      // Exibir mensagem e atualizar badge
      if (typeof cardapio !== "undefined" && cardapio.metodos) {
        cardapio.metodos.mensagem("Item adicionado ao carrinho", "green");
        cardapio.metodos.atualizarBadgeTotal();
      }
    }
  },
};
