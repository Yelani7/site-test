document.addEventListener('DOMContentLoaded', () => {
  // --- Injection des infos du produit depuis localStorage ---
  const cartName = document.getElementById('cart-name');
  const cartPrice = document.getElementById('cart-price');
  const cartImage = document.getElementById('cart-image');
  const cartDescription = document.getElementById('cart-description');

  if (cartName) cartName.innerText = localStorage.getItem('cart-name') || "Nom du produit";
  if (cartImage) cartImage.src = localStorage.getItem('cart-img') || "";
  if (cartDescription) cartDescription.innerText = localStorage.getItem('cart-description') || "";

  // ⚠️ Ici tu avais ajouté " + ' €' " → remplace par " + ' $' " car tes prix sont en dollars
  let rawPrice = localStorage.getItem('cart-price') || "0";
  let unitPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, "")); // enlève le symbole $ pour garder juste le nombre

  // --- Gestion de la quantité ---
  const plusBtn = document.getElementById('plus');   // ⚠️ Vérifie que ton HTML a bien id="plus"
  const minusBtn = document.getElementById('minus'); // ⚠️ Vérifie que ton HTML a bien id="minus"
  const qtyInput = document.getElementById('quantity'); // ⚠️ Vérifie que ton HTML a bien id="quantity"

  // --- Fonction pour mettre à jour le prix total ---
  function updateTotal() {
    const quantity = parseInt(qtyInput.value);
    const total = unitPrice * quantity;
    cartPrice.innerText = total + " $"; // ⚠️ Mets bien le symbole dollar
  }

  if (plusBtn && qtyInput) {
    plusBtn.addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
      updateTotal(); // ⚠️ Ajout du recalcul ici
    });
  }

  if (minusBtn && qtyInput) {
    minusBtn.addEventListener('click', () => {
      let q = parseInt(qtyInput.value);
      if (q > 1) {
        qtyInput.value = q - 1;
        updateTotal(); // ⚠️ Ajout du recalcul ici
      }
    });
  }

  // --- Bouton "Ajouter au panier" ---
  const validateBtn = document.querySelector('.add-to-cart'); // ⚠️ Vérifie que ton bouton a bien class="add-to-cart"
  if (validateBtn && qtyInput) {
    validateBtn.addEventListener('click', () => {
      alert("Article ajouté au panier avec quantité : " + qtyInput.value +
            " | Prix total : " + cartPrice.innerText);
      localStorage.setItem('cart-quantity', qtyInput.value);
    });
  }

  // --- Bonus : rendre l'article cliquable (image ou nom) ---
  if (cartImage) {
    cartImage.addEventListener('click', () => {
      alert("Tu as cliqué sur l'image du produit !");
    });
  }

  if (cartName) {
    cartName.addEventListener('click', () => {
      alert("Tu as cliqué sur le nom du produit !");
    });
  }

  // --- Initialiser le prix total au chargement ---
  updateTotal(); // ⚠️ Ajout pour afficher directement le bon prix dès le départ
});
const validateBtn = document.getElementById('validate');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-popup');

validateBtn.addEventListener('click', () => {
  // Récupérer infos du panier
  const name = localStorage.getItem('cart-name');
  const quantity = localStorage.getItem('cart-quantity');
  const price = document.getElementById('cart-price').innerText;

  // Injecter dans la popup
  document.getElementById('invoice-name').innerText = "Produit : " + name;
  document.getElementById('invoice-quantity').innerText = "Quantité : " + quantity;
  document.getElementById('invoice-price').innerText = "Prix total : " + price;

  // Afficher la popup
  popup.style.display = "flex";
});

closeBtn.addEventListener('click', () => {
  popup.style.display = "none"; // fermer la popup
});
