// export default function initModalCarrinho() {
//   function selecionarElementoDom(elementoDom) {
//     return document.querySelector(elementoDom);
//   }

//   // containers
//   const modalContainer = selecionarElementoDom('[data-modal="modal"]');
//   const produtosContainer = selecionarElementoDom('[data-modal="products"]');
//   const entregaContainer = selecionarElementoDom('[data-modal="entrega"]');
//   const menuContainer = selecionarElementoDom("#menu");
//   const resumoPedido = selecionarElementoDom("[data-modal='resumo']");
//   const resumoEndereco = selecionarElementoDom("[ data-modal='resumo-endereco']");

//   // titulos
//   const tituloProdutos = selecionarElementoDom('[data-modal="titulo-produtos"]');
//   const tituloEntrega = selecionarElementoDom('[data-modal="titulo-entrega"]');
//   const tituloResumo = selecionarElementoDom('[data-modal="titulo-resumo"]');

//   // steps
//   const line1 = selecionarElementoDom('[data-modal="line1"]');
//   const line2 = selecionarElementoDom('[data-modal="line2"]');
//   const step2 = selecionarElementoDom('[data-modal="step2"]');
//   const step3 = selecionarElementoDom('[data-modal="step3"]');

//   // Buttons
//   const btnMeuCarrinho = selecionarElementoDom('[data-modal="btn-meuCarrinho"]');
//   const btnFechar = selecionarElementoDom('[data-modal="btn-fechar"]');
//   const btnContinuar = selecionarElementoDom('[data-modal="btn-continuar"]');
//   const btnVoltar = selecionarElementoDom('[data-modal="btn-voltar"]');
//   const btnRevisar = selecionarElementoDom('[data-modal="btn-revisar"]');
//   const btnVoltarRevisao = selecionarElementoDom('[data-modal="btn-voltarRevisao"]');
//   const btnEnviar = selecionarElementoDom('[data-modal="btn-enviar"]');
//   const toggleMenu = selecionarElementoDom('[data-toggle="collapse"]');

//   // Classes css
//   const classeHidden = "hidden"; // Para mostrar ou ocultar o modal do Carrinho
//   const classechecked = "checked"; // Para fazer verificação dos steps - passo a passo da compra

//   // Eventos Lista

//   const eventos = ["click", "touchstart"];

//   eventos.forEach((eventoUsuario) => btnMeuCarrinho.addEventListener(eventoUsuario, abrirModal));

//   // btnMeuCarrinho.addEventListener("click", abrirModal);

//   function abrirModal() {
//     const constainsClassOpen =
//       menuContainer.classList.contains("open") && toggleMenu.classList.contains("open");

//     if (constainsClassOpen) {
//       menuContainer.classList.remove("open");
//       toggleMenu.classList.remove("open");
//     }
//     modalContainer.classList.remove(classeHidden);

//     fecharModal();
//     continuar();
//     voltarInicio();
//     revisarPedido();
//     voltarMeio();
//   }

//   function fecharModal() {
//     btnFechar.addEventListener("click", () => {
//       modalContainer.classList.add(classeHidden);
//       document.body.style.overflow = "auto";
//     });
//   }

//   function continuar() {
//     eventos.forEach((eventoUsuario) =>
//       btnContinuar.addEventListener(eventoUsuario, (e) => {
//         e.preventDefault();
//         ocultarElementos([produtosContainer, tituloProdutos, btnContinuar], classeHidden);
//         mostrarElementos([entregaContainer, tituloEntrega, btnVoltar, btnRevisar], classeHidden);
//         mostrarEtapas([step2, line1], classechecked);
//       })
//     );
//   }

//   function voltarInicio() {
//     btnVoltar.addEventListener("click", () => {
//       ocultarElementos([entregaContainer, tituloEntrega, btnRevisar, btnVoltar], classeHidden);
//       mostrarElementos([produtosContainer, tituloProdutos, btnContinuar], classeHidden);
//       ocultarEtapas([step2, line1], classechecked);
//     });
//   }

//   function voltarMeio() {
//     btnVoltarRevisao.addEventListener("click", () => {
//       ocultarElementos(
//         [resumoPedido, tituloResumo, btnVoltarRevisao, btnEnviar, resumoEndereco],
//         classeHidden
//       );
//       mostrarElementos([entregaContainer, tituloEntrega, btnRevisar, btnVoltar], classeHidden);
//       ocultarEtapas([step3, line2], classechecked);
//     });

//     // btnVoltarRevisao
//   }

//   function revisarPedido() {
//     eventos.forEach((eventoUsuario) =>
//       btnRevisar.addEventListener(eventoUsuario, () => {
//         ocultarElementos([entregaContainer, tituloEntrega, btnVoltar, btnRevisar], classeHidden);
//         mostrarElementos(
//           [resumoPedido, tituloResumo, resumoEndereco, btnVoltarRevisao, btnEnviar],
//           classeHidden
//         );

//         mostrarEtapas([step3, line2], classechecked);
//       })
//     );
//   }

//   function ocultarElementos(alvos, classe) {
//     alvos.forEach((alvo) => {
//       alvo.classList.add(classe);
//     });
//   }
//   function mostrarElementos(alvos, classe) {
//     alvos.forEach((alvo) => {
//       alvo.classList.remove(classe);
//     });
//   }

//   function mostrarEtapas(alvos, classe) {
//     alvos.forEach((alvo) => {
//       alvo.classList.add(classe);
//     });
//   }

//   function ocultarEtapas(alvos, classe) {
//     alvos.forEach((alvo) => {
//       alvo.classList.remove(classe);
//     });
//   }

//   return {
//     fecharModal,
//     continuar,
//     voltarInicio,
//     voltarMeio,
//     selecionarElementoDom,
//     revisarPedido,
//   };
// }
