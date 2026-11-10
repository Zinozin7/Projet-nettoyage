/* Balayo — interactions légères : header sticky, menu mobile, dropdown, FAQ, bouton d'appel flottant */
document.addEventListener("DOMContentLoaded", function () {
  /* Header : ombre au scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Boutons d'appel et WhatsApp flottants : masqués en haut de page (un bouton
     d'appel existe déjà dans le bloc d'accueil), affichés après un léger
     défilement pour éviter tout chevauchement avec le contenu de la première vue. */
  var floatingCall = document.querySelector(".floating-call");
  var floatingWhatsapp = document.querySelector(".floating-whatsapp");
  if (floatingCall || floatingWhatsapp) {
    var onFloatingScroll = function () {
      var visible = window.scrollY > 420;
      if (floatingCall) floatingCall.classList.toggle("is-visible", visible);
      if (floatingWhatsapp) floatingWhatsapp.classList.toggle("is-visible", visible);
    };
    onFloatingScroll();
    window.addEventListener("scroll", onFloatingScroll, { passive: true });
  }

  /* Formulaire de contact : pas de backend sur ce site statique, l'envoi
     ouvre WhatsApp avec un message pré-rempli à partir des champs saisis. */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = contactForm.querySelector("#cf-name").value.trim();
      var phone = contactForm.querySelector("#cf-phone").value.trim();
      var service = contactForm.querySelector("#cf-service").value;
      var message = contactForm.querySelector("#cf-message").value.trim();

      var lines = [
        "Bonjour Balayo, je souhaite une demande de devis.",
        "Nom : " + name,
        "Téléphone : " + phone,
        "Besoin : " + service
      ];
      if (message) lines.push("Message : " + message);

      var text = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/33786438005?text=" + text, "_blank", "noopener");
    });
  }

  /* Menu mobile */
  var burger = document.querySelector(".burger");
  var mobileMenu = document.querySelector(".mobile-menu");
  var mobileClose = document.querySelector(".mobile-menu-close");

  function openMobileMenu() {
    mobileMenu.classList.add("is-open");
    document.body.classList.add("no-scroll");
    burger.setAttribute("aria-expanded", "true");
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    burger.setAttribute("aria-expanded", "false");
  }

  if (burger && mobileMenu) {
    burger.addEventListener("click", openMobileMenu);
    if (mobileClose) mobileClose.addEventListener("click", closeMobileMenu);
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileMenu();
    });
  }

  /* Dropdown Prestations (clic clavier / tactile) */
  var dropdowns = document.querySelectorAll(".nav-item-dropdown");
  dropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector(".nav-link");
    trigger.addEventListener("click", function (e) {
      if (window.matchMedia("(hover: none)").matches) {
        e.preventDefault();
        dropdown.classList.toggle("is-open");
      }
    });
  });
  document.addEventListener("click", function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) dropdown.classList.remove("is-open");
    });
  });

  /* FAQ accordéon */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq-answer").style.maxHeight = null;
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
});
