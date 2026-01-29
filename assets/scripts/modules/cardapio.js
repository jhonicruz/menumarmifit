$(document).ready(function () {
  cardapio.metodos.init();
  cardapio.metodos.obterItensCardapio();
  cardapio.metodos.aumentarQuantidade();
  cardapio.metodos.diminuirQuantidade();
  cardapio.metodos.diminuirQuantidade();
  cardapio.metodos.adicionarAoCarrinho();
  cardapio.metodos.atualizarBadgeTotal();
  cardapio.metodos.carregarEtapa();
});

var cardapio = {};

var meuCarrinho = [];

cardapio.metodos = {
  init: () => {
    console.log("iniciou");
  },

  obterItensCardapio: (categoria = "aves", vermais = false) => {
    var filtro = MENU[categoria];

    if (!vermais) {
      $(".cardapio__cards").html("");
      $("#vermais").removeClass("hidden");
    }

    $.each(filtro, (i, e) => {
      let price = e.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

      let temp = cardapio.templates.item
        .replace(/\${img}/g, e.img)
        .replace(/\${name}/g, e.name)
        .replace(/\${price}/g, price)
        .replace(/\${id}/g, e.id);

      // Clicou em ver mais (+ 4 itens)

      if (vermais && i >= 8 && i < 12) {
        $(".cardapio__cards").append(temp);
      }

      // Paginação inicial (8 itens)

      if (!vermais && i < 8) {
        $(".cardapio__cards").append(temp);
      }
    });

    $(".cardapio__categories ul li a").removeClass("ativo");

    $("#menu-" + categoria).addClass("ativo");
  },

  // Clique no botão de Ver mais
  verMais: () => {
    var ativo = $(".cardapio__categories ul li a").attr("id").split("menu-")[1];
    cardapio.metodos.obterItensCardapio(ativo, true);

    $("#vermais").addClass("hidden");
  },

  aumentarQuantidade: (id) => {
    let qntdAtual = parseInt($("#qntd-" + id).text());
    $("#qntd-" + id).text(qntdAtual + 1);
  },

  diminuirQuantidade: (id) => {
    let qntdAtual = parseInt($("#qntd-" + id).text());

    if (qntdAtual > 0) {
      $("#qntd-" + id).text(qntdAtual - 1);
    }
  },

  // Adicionar o item ao carrinho
  adicionarAoCarrinho: (id) => {
    let qntdAtual = parseInt($("#qntd-" + id).text());

    if (qntdAtual > 0) {
      // Obter a categoria Ativa
      let categoria = $(".cardapio__categories ul li a.ativo").attr("id").split("menu-")[1];

      //obtem a lista de itens

      let filtro = MENU[categoria];

      //obtem o item

      let item = $.grep(filtro, (e, i) => {
        return e.id == id;
      });

      if (item.length > 0) {
        // validar se já existe esse item no carrinho

        let existe = $.grep(meuCarrinho, (elem, index) => {
          return elem.id == id;
        });

        // caso já exista o item no carrinho, só altera a quantidade

        if (existe.length > 0) {
          let objIndex = meuCarrinho.findIndex((obj) => obj.id == id);
          meuCarrinho[objIndex].qntd = meuCarrinho[objIndex].qntd + qntdAtual;
        }

        // caso ainda não exista o item no carrinho, adiciona ele
        else {
          item[0].qntd = qntdAtual;
          meuCarrinho.push(item[0]);
        }
        // alert("Item adicionado ao carrinho");
        cardapio.metodos.mensagem("Item adicionado ao carrinho", "green");
        $("#qntd-" + id).text(0);

        cardapio.metodos.atualizarBadgeTotal();
      }
    }
  },

  // Atualiza o badge de total dos botões de carrinho
  atualizarBadgeTotal: () => {
    var total = 0;
    $.each(meuCarrinho, (i, e) => {
      total += e.qntd;
    });

    if (total > 0) {
      $(".btn-cart").removeClass("hidden");
      $(".container-total-carrinho").removeClass("hidden");
    } else {
      $(".btn-cart").addClass("hidden");
      $(".container-total-carrinho").addClass("hidden");
    }

    $(".badge-total").html(total);
  },

  abrirCarrinho: (abrir) => {
    if (abrir) {
      $("[data-modal='modal']").removeClass("hidden");
      cardapio.metodos.carregarEtapa(1);
      document.body.style.overflow = "hidden";
    } else {
      $("[data-modal='modal']").addClass("hidden");
      document.body.style.overflow = "auto";
    }
  },

  carregarEtapa: (etapa) => {
    if (etapa == 1) {
      // etapas
      $(".line").removeClass("checked");
      $(".etapa").removeClass("checked");
      $(".etapa1").addClass("checked");

      // titulo
      $("[data-modal='titulo-etapas'] h4").text("Seu Carrinho:");

      // containers
      $(".produtos-container").removeClass("hidden");

      $(".local-entrega ").addClass("hidden");
      $(".resumo-pedido").addClass("hidden");

      // botoes
      $("[data-modal='btn-continuar']").removeClass("hidden");

      $("[data-modal='btn-enviar']").addClass("hidden");
      $("[data-modal='btn-revisar']").addClass("hidden");
      $("[data-modal='btn-voltar']").addClass("hidden");
    }

    if (etapa == 2) {
      // etapas
      $(".etapa").removeClass("checked");
      $(".line").removeClass("checked");

      $(".etapa1").addClass("checked");
      $(".etapa2").addClass("checked");
      $(".line1").addClass("checked");

      // titulo

      $("[data-modal='titulo-etapas'] h4").text("Endereço de Entrega:");

      // containers

      $("[data-modal='produtos']").addClass("hidden");
      $("[data-modal='resumo']").addClass("hidden");

      $("[data-modal='entrega']").removeClass("hidden");

      //botoes

      $("[data-modal='btn-revisar']").removeClass("hidden");
      $("[data-modal='btn-voltar']").removeClass("hidden");

      $("[data-modal='btn-continuar']").addClass("hidden");
      $("[data-modal='btn-enviar']").addClass("hidden");
    }

    if (etapa == 3) {
      // etapas
      $(".line").removeClass("checked");

      $(".etapa1").addClass("checked");
      $(".line1").addClass("checked");

      $(".etapa2").addClass("checked");
      $(".line2").addClass("checked");

      $(".etapa3").addClass("checked");
      $(".line2").addClass("checked");
      // titulo

      $("[data-modal='titulo-etapas'] h4").text("Endereço de Entrega:");

      // containers

      $("[data-modal='produtos']").addClass("hidden");
      $("[data-modal='entrega']").addClass("hidden");

      $("[data-modal='resumo']").removeClass("hidden");

      //botoes

      $("[data-modal='btn-enviar']").removeClass("hidden");
      $("[data-modal='btn-voltar']").removeClass("hidden");

      $("[data-modal='btn-continuar']").addClass("hidden");
      $("[data-modal='btn-revisar']").addClass("hidden");
    }
  },

  voltarEtapa: () => {
    let etapa = $(".etapa.checked").length;
    cardapio.metodos.carregarEtapa(etapa - 1);
  },

  mensagem: (texto, cor = "red", tempo = 3000) => {
    let id = Math.floor(Date.now() * Math.random()).toString();

    let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`;
    $(".container-mensagens").append(msg);

    setTimeout(() => {
      $("#msg-" + id).removeClass("fadeInDown");
      $("#msg-" + id).addClass("fadeOutUp");

      setTimeout(() => {
        $("#msg-" + id).remove();
      }, 800);
    }, tempo);
  },
};

cardapio.templates = {
  item: `<div class=" box animar">
 <div class="cards__item shadow-8dp" id="\${id}">
 <div class="cards__item__image">
   <img
     src="\${img}"
     alt=""
   />
 </div>

 <div class="cards__item__content">
   <div class="cards__item__content__text">
     <h3>\${name}</h3>
     <span>\${price}</span>
   </div>

   <div class="add-to-cart">
     <div class="add-to-cart__buttons">
       <span class="add-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')" ><i class="fas fa-minus"></i></span>
       <span class="add-numero-items" id="qntd-\${id}">0</span>
       <span class="add-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')" ><i class="fas fa-plus"></i></span>
     </div>

     <div class="btn-add-box">
       <span class="btn-add" onclick="cardapio.metodos.adicionarAoCarrinho('\${id}')"
         ><a ><i class="fa fa-shopping-bag"></i></a
       ></span>
     </div>
   </div>
 </div>
</div>
</div>`,

  itemCarrinhos: `  <div class="produto ">
    
 <div class="produto-image">
   <img src="\${img}" alt="">

   <div class=" produto-preco">
   <h3>\${name}</h3>
   <span>\${price}</span>
   </div>

 </div>

 <div class="add-to-cart add-to-cart-modal">
   <div class="add-to-cart__buttons">
   <span class="add-menos" onclick="cardapio.metodos.diminuirQuantidadeCarrinho('\${id}')" ><i class="fas fa-minus"></i></span>
   <span class="add-numero-items" id="qntd-\${id}">\${qntd}</span>
   <span class="add-mais" onclick="cardapio.metodos.aumentarQuantidadeCarrinho('\${id}')" ><i class="fas fa-plus"></i></span>
   </div>

   <div class="btn-add-box">
     <span class="btn-add" onclick="cardapio.removerItemCarrinho('\${id}')"
       ><a ><i class="fa fa-times"></i></a
     ></span>
   </div>
 </div>
</div>`,
};

cardapio.eventos = {};
