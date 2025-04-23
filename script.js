const productsData = {
    "tesla-model-s": {
      id: "tesla-model-s",
      name: "Model S",
      brand: "Tesla",
      price: 6500000,
      image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/car-1957037_960_720.jpg"
    },
    "toyota-camry": {
      id: "toyota-camry",
      name: "Camry",
      brand: "Toyota",
      price: 3200000,
      image: "https://cdn.pixabay.com/photo/2020/05/22/17/27/toyota-5208360_960_720.jpg"
    },
    "audi-q7": {
      id: "audi-q7",
      name: "Q7",
      brand: "Audi",
      price: 7800000,
      image: "https://cdn.pixabay.com/photo/2020/10/14/18/17/audi-5654464_960_720.jpg"
    }
  };
  
  let cart = [];
  
  function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => {
      page.classList.remove('active-page');
    });
    document.getElementById(pageId).classList.add('active-page');
    if (pageId === 'cart') {
      updateCartDisplay();
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.card a:nth-child(6)').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.card');
        const productName = card.querySelector('h3').textContent;
        const productBrand = card.querySelector('p').textContent;
        let productId = '';
        for (const id in productsData) {
          if (productsData[id].name === productName && productsData[id].brand === productBrand) {
            productId = id;
            break;
          }
        }
        if (productId) {
          addToCart(productId);
        }
      });
    });
    showPage('home');
  });
  
  function addToCart(productId) {
    const product = productsData[productId];
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    alert(`${product.brand} ${product.name} добавлен в корзину!`);
    updateCartDisplay();
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
  }
  
  function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('#cart .cart-container');
    const cartTitle = cartItemsContainer.querySelector('.cart-title');
    const checkoutButton = cartItemsContainer.querySelector('.checkout');
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.appendChild(cartTitle);
    
    if (cart.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Ваша корзина пуста';
      cartItemsContainer.appendChild(emptyMessage);
    } else {
      cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <img src="${item.image}" alt="${item.brand} ${item.name}" />
          <div class="item-details">
            <h3>${item.brand} ${item.name}</h3>
            <p>Цена: ${item.price.toLocaleString()} ₽</p>
            <p>Количество: ${item.quantity}</p>
          </div>
          <button class="remove-button" onclick="removeFromCart('${item.id}')">Удалить</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
      });
      
      const totalElement = document.createElement('div');
      totalElement.className = 'total';
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      totalElement.innerHTML = `<p>Итоговая сумма: ${totalAmount.toLocaleString()} ₽</p>`;
      cartItemsContainer.appendChild(totalElement);
    }
    
    cartItemsContainer.appendChild(checkoutButton);
    updateCartIcon();
  }
  
  function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
      cartIcon.innerHTML = `🛒 <span class="cart-count">${totalItems}</span>`;
    } else {
      cartIcon.textContent = '🛒';
    }
  }
  
  document.querySelector('.checkout button')?.addEventListener('click', function() {
    if (cart.length === 0) {
      alert('Ваша корзина пуста!');
      return;
    }
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Заказ оформлен! Сумма заказа: ${totalAmount.toLocaleString()} ₽. Спасибо за покупку!`);
    cart = [];
    updateCartDisplay();
  });