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

var meuEndereco = null;

var valorCarrinho = 0;

var valorEntrega = 5;

var celularEmpresa = "5588999834281";

cardapio.metodos = {
  init: () => {
    console.log("iniciou");

    cardapio.metodos.obterItensCardapio();
    cardapio.metodos.carregarBotaoReserva();
    cardapio.metodos.carregarBotaoLigar();
  },

  obterItensCardapio: (categoria = "aves", vermais = false) => {
    var filtro = MENU[categoria];

    if (!vermais) {
      $(".cardapio__cards").html("");
      $("#vermais").removeClass("hidden");
    }

    $.each(filtro, (i, e) => {
      let price = e.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

      let obs = e.obs.join(", ");

      let temp = cardapio.templates.item
        .replace(/\${img}/g, e.img)
        .replace(/\${name}/g, e.name)
        .replace(/\${dsc}/g, e.dsc)
        .replace(/\${price}/g, price)
        .replace(/\${obs}/g, obs);

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
      $(".botao-carrinho").removeClass("hidden");
      $(".container-total-carrinho").removeClass("hidden");
    } else {
      $(".botao-carrinho").addClass("hidden");
      $(".container-total-carrinho").addClass("hidden");
    }

    $(".badge-total-carrinho").html(total);
  },

  abrirCarrinho: (abrir) => {
    if (abrir) {
      $("[data-modal='modal']").removeClass("hidden");
      cardapio.metodos.carregarCarrinho();
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
      $("[data-modal='resumo-endereco']").addClass("hidden");

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
      $("[data-modal='resumo-endereco']").addClass("hidden");
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

      $("[data-modal='titulo-etapas'] h4").text("Itens do Pedido:");

      // containers

      $("[data-modal='produtos']").addClass("hidden");
      $("[data-modal='entrega']").addClass("hidden");
      $("[data-modal='resumo']").removeClass("hidden");
      $("[data-modal='resumo-endereco']").removeClass("hidden");

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

  // Carrega lista de itens do carrinho

  carregarCarrinho: () => {
    cardapio.metodos.carregarEtapa(1);

    if (meuCarrinho.length > 0) {
      $(".produtos-container").html("");
      $(".produtos-container").css({
        "justify-content": "flex-start",
        "border-bottom": "none",
      });

      $.each(meuCarrinho, (i, e) => {
        let price = e.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

        let temp = cardapio.templates.itemCarrinho
          .replace(/\${img}/g, e.img)
          .replace(/\${name}/g, e.name)
          .replace(/\${price}/g, price)
          .replace(/\${id}/g, e.id)
          .replace(/\${qntd}/g, e.qntd);
        $(".produtos-container").append(temp);

        // último item

        if (i + 1 == meuCarrinho.length) {
          cardapio.metodos.carregarValores();
        }
      });
    } else {
      $(".produtos-container").html(
        '<p class="carrinho-vazio" style="justify-self:center;"><i class="fa fa-shopping-bag"></i> Seu Carrinho está vazio</p>'
      );

      $(".produtos-container").css({
        "justify-content": "center",
        "border-bottom": "1px solid rgb(231, 231, 231)",
      });
      cardapio.metodos.carregarValores();
    }
  },

  // Diminuir quantidade do item no carrinho
  diminuirQuantidadeCarrinho: (id) => {
    let qntdAtual = parseInt($("#qntd-carrinho-" + id).text());

    if (qntdAtual > 1) {
      $("#qntd-carrinho-" + id).text(qntdAtual - 1);
      cardapio.metodos.atualizarCarrinho(id, qntdAtual - 1);
    } else {
      cardapio.metodos.removerItemCarrinho(id);
    }
  },

  aumentarQuantidadeCarrinho: (id) => {
    let qntdAtual = parseInt($("#qntd-carrinho-" + id).text());
    $("#qntd-carrinho-" + id).text(qntdAtual + 1);
    cardapio.metodos.atualizarCarrinho(id, qntdAtual + 1);
  },

  // botao remover item do carrinho

  removerItemCarrinho: (id) => {
    meuCarrinho = $.grep(meuCarrinho, (e, i) => {
      return e.id != id;
    });
    cardapio.metodos.carregarCarrinho();
    // Atualiza o botão carrinho com a quantidade atualizada
    cardapio.metodos.atualizarBadgeTotal();
  },

  // Atualiza o carrinho com a quantidade atual
  atualizarCarrinho: (id, qntd) => {
    let objIndex = meuCarrinho.findIndex((obj) => obj.id == id);
    meuCarrinho[objIndex].qntd = qntd;

    // Atualiza o botão carrinho com a quantidade atualizada
    cardapio.metodos.atualizarBadgeTotal();

    // Atualiza os valores (R$) totais do carrinho
    cardapio.metodos.carregarValores();
  },

  // carrega os valores de subtotal e total
  carregarValores: () => {
    valorCarrinho = 0;

    $("#valorSubtotal").text("R$ 0,00");
    $("#valorEntrega").text("R$ + 0,00");
    $("#valorTotal").text("R$ 0,00");

    $.each(meuCarrinho, (i, e) => {
      valorCarrinho += parseFloat(e.price * e.qntd);
      if (i + 1 == meuCarrinho.length) {
        $("#valorSubtotal").text(
          `${valorCarrinho.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        );
        $("#valorEntrega").text(
          `+ ${valorEntrega.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        );
        $("#valorTotal").text(
          `${(valorCarrinho + valorEntrega).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`
        );
      }
    });
  },

  // Carrega a etapa endereços
  carregarEndereco: () => {
    if (meuCarrinho.length <= 0) {
      cardapio.metodos.mensagem("Seu carrinho está vazio");
      return;
    }

    cardapio.metodos.carregarEtapa(2);
  },
  // API Via Cep
  buscarCep: () => {
    // Cria a variável com o valor do cep
    var cep = $("#cep").val().trim().replace(/\D/g, "");

    // Verifica se o CEP possui valor informado
    if (cep != "") {
      // Expressão regular para validar CEP
      var validarCep = /^[0-9]{8}$/;

      if (validarCep.test(cep)) {
        $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
          if (!("erro" in dados)) {
            // Atualiza os campos com os valores retornados

            $("#endereco").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
            $("#cidade").val(dados.localidade);
            $("#uf").val(dados.uf);
            $("#numero").focus();
          } else {
            cardapio.metodos.mensagem("CEP Não Encontrado. Preencha as informações manualmente.");
            $("#endereco").focus();
          }
        });
      } else {
        cardapio.metodos.mensagem("Formato do CEP inválido.");
        $("#cep").focus();
      }
    } else {
      cardapio.metodos.mensagem("Informe o CEP, por favor.");
      $("#cep").focus();
    }
  },
  // Validação Antes de prosseguir para a etapa 3
  resumoPedido: () => {
    let cep = $("#cep").val().trim();
    let endereco = $("#endereco").val().trim();
    let bairro = $("#bairro").val().trim();
    let cidade = $("#cidade").val().trim();
    let uf = $("#uf").val().trim();
    let numero = $("#numero").val().trim();
    let complemento = $("#complemento").val().trim();

    if (cep.length <= 0) {
      cardapio.metodos.mensagem("Informe o CEP por favor");
      $("#cep").focus();
      return;
    }

    if (endereco.length <= 0) {
      cardapio.metodos.mensagem("Informe o Endereço por favor");
      $("#endereco").focus();
      return;
    }

    if (bairro.length <= 0) {
      cardapio.metodos.mensagem("Informe o Bairro por favor");
      $("#bairro").focus();
      return;
    }

    if (cidade.length <= 0) {
      cardapio.metodos.mensagem("Informe o cidade por favor");
      $("#cidade").focus();
      return;
    }

    if (uf == -1) {
      cardapio.metodos.mensagem("Informe o UF por favor");
      $("#uf").focus();
      return;
    }

    if (numero.length <= 0) {
      cardapio.metodos.mensagem("Informe o numero por favor");
      $("#numero").focus();
      return;
    }

    meuEndereco = {
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      numero: numero,
      complemento: complemento,
    };

    cardapio.metodos.carregarEtapa(3);
    cardapio.metodos.carregarResumo();
  },

  // Carrega a etapa de resumo do pedido
  carregarResumo: () => {
    $(".resumo-pedido").html("");

    $.each(meuCarrinho, (i, e) => {
      let price = e.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      let temp = cardapio.templates.itemResumo
        .replace(/\${img}/g, e.img)
        .replace(/\${name}/g, e.name)
        .replace(/\${price}/g, price)
        .replace(/\${qntd}/g, e.qntd);
      $(".resumo-pedido").append(temp);
    });

    $(".nome-endereco").html(
      `${meuEndereco.endereco}, ${meuEndereco.numero}, ${meuEndereco.bairro} `
    );
    $(".nome-localidade").html(
      `${meuEndereco.cidade}-${meuEndereco.uf} / ${meuEndereco.cep}.  ${meuEndereco.complemento}.`
    );

    cardapio.metodos.finalizarPedido();
  },

  finalizarPedido: () => {
    if (meuCarrinho.length > 0 && meuEndereco != null) {
      var texto = "Olá! gostaria de fazer um pedido:";
      texto += `\n*Itens do pedido:*\n\n\${itens}`;
      texto += "\n*Endereço de entrega:*";
      texto += `\n${meuEndereco.endereco}, ${meuEndereco.numero}, ${meuEndereco.bairro}`;
      texto += `\n${meuEndereco.cidade}-${meuEndereco.uf} / ${meuEndereco.cep} ${meuEndereco.complemento}`;
      texto += `\n\n*Total (com entrega): ${(valorCarrinho + valorEntrega).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}*`;

      var itens = "";

      $.each(meuCarrinho, (i, e) => {
        itens += `*${e.qntd}X* ${e.name} ...... R$ ${e.price.toFixed(2).replace(".", ",")}\n`;

        // ultimo item
        if (i + 1 == meuCarrinho.length) {
          // converter URL
          texto = texto.replace(/\${itens}/g, itens);
          let encode = encodeURI(texto);
          let URL = `https://wa.me/${celularEmpresa}?text=${encode}`;

          $("#enviarPedido").attr("href", URL);
        }
      });
    }
  },

  carregarBotaoReserva: () => {
    var texto = "Olá, gostaria de fazer uma *Reserva*";
    let encode = encodeURI(texto);
    let URL = `https://wa.me/${celularEmpresa}?text=${encode}`;

    $("#btnReserva").attr("href", URL);
  },

  carregarBotaoLigar: () => {
    $("#btnLigar").attr("href", `tel:${celularEmpresa}`);
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
 <div class="cardapio__item shadow-8dp" id="\${id}">
 <div class="cardapio__item__image">
   <img
     src="\${img}"
     alt=""
   />
 </div>

 <div class="cardapio__item__content">
   <div class="cardapio__item__content__text">
     <h3>\${name}</h3>
     <p>\${dsc}</p>
     <span class="obs">\${obs}</span>
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

  itemCarrinho: `  <div class="produto ">
    
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
   <span class="add-numero-items" id="qntd-carrinho-\${id}">\${qntd}</span>
   <span class="add-mais" onclick="cardapio.metodos.aumentarQuantidadeCarrinho('\${id}')" ><i class="fas fa-plus"></i></span>
   </div>

   <div class="btn-add-box">
     <span class="btn-add" onclick="cardapio.metodos.removerItemCarrinho('\${id}')"
       ><a ><i class="fa fa-times"></i></a
     ></span>
   </div>
 </div>
</div>`,

  itemResumo: `
  <div class="produto produto-resumo">
    
    <div class="produto-image produto-image--resumo">
      <img src="\${img}" alt="">

      <div class=" produto-preco">
        <h3>\${name}</h3>
        <span>\${price}</span>
      </div>

    </div>

    <div class="produto-quantidade">
      <span>X \${qntd}</span>
    </div>
  </div>
  
  `,
};

cardapio.eventos = {};
