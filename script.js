const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const filterButtons = document.querySelectorAll(".filter");
const serviceCards = document.querySelectorAll(".service-card");
const detailButtons = document.querySelectorAll(".service-details");

const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalList = document.getElementById("modalList");
const modalWhatsapp = document.getElementById("modalWhatsapp");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    serviceCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

detailButtons.forEach(button => {
  button.addEventListener("click", () => {
    const title = button.dataset.title;
    const description = button.dataset.description;
    const items = button.dataset.items.split("|");

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalList.innerHTML = "";

    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      modalList.appendChild(li);
    });

    const message = `Olá, Luiz! Vi o serviço "${title}" no site da LC Desenvolvimento Web e gostaria de solicitar um orçamento.`;
    modalWhatsapp.href = `https://wa.me/5513988799046?text=${encodeURIComponent(message)}`;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();
