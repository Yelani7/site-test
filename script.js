
 const searchBar = document.getElementById("searchBar");
const products = document.querySelectorAll(".product-card"); // on cible tes cartes produits

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase().trim();

  products.forEach(product => {
    const name = product.getAttribute("data-name")?.toLowerCase() || "";
    const price = product.getAttribute("data-price")?.toLowerCase() || "";
    const text = product.textContent.toLowerCase();

    // On regroupe toutes les infos de la carte produit
    const searchable = name + " " + price + " " + text;

    if (searchable.includes(query)) {
      product.classList.remove("hidden");
    } else {
      product.classList.add("hidden");
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // --- Gestion des boutons "Ajouter au panier" ---
  const addButtons = document.querySelectorAll('.add-to-cart');

  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const name = productCard.dataset.name;
      const price = productCard.dataset.price;
      const imgSrc = productCard.querySelector('img').src;

      // Stocker les infos dans localStorage
      localStorage.setItem('cart-name', name);
      localStorage.setItem('cart-price', price);
      localStorage.setItem('cart-img', imgSrc);

      // Redirection vers la page panier
      window.location.href = "panier.html";
    });
  });
});
