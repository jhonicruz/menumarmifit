// import initModalCarrinho from "./modal-cart.js";
// const { fecharModal, continuar, voltarMeio, voltarInicio, revisarPedido } = initModalCarrinho();

export default function initScrollSuave() {
  const links = document.querySelectorAll("[data-menu='scroll'] li");
  const menuContainer = document.querySelector("#menu");
  const toggleMenu = document.querySelector('[data-toggle="collapse"]');
  const modalContainer = document.querySelector('[data-modal="modal"]');

  const linkBanner = document.querySelector("[data-test]");

  console.log(linkBanner);

  function handleClick(e) {
    e.preventDefault();
    const constainsClassOpen = menuContainer.classList.contains("open") && toggleMenu.classList.contains("open");

    const elementTarget = e.target;
    const containsAttributeModal = elementTarget.hasAttribute("data-modal");
    const target = e.target.getAttribute("href");

    if (constainsClassOpen) {
      menuContainer.classList.remove("open");
      toggleMenu.classList.remove("open");
      document.body.style.overflow = "auto";
    }

    if (containsAttributeModal) {
      modalContainer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      // continuar();
      // voltarMeio();
      // voltarInicio();
      // fecharModal();
      // revisarPedido();
    } else {
      const sections = document.querySelector(target);
      const topSections = sections.getBoundingClientRect().top;

      window.scrollTo({
        top: topSections,
        behavior: "smooth",
      });
    }
  }
  if (links) {
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });
  }
  if (linkBanner) {
    linkBanner.addEventListener("click", handleClick);
  }
}
