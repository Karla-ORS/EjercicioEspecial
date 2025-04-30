document.addEventListener("DOMContentLoaded", () => {
  const loadButton = document.querySelector("button.btn.btn-primary");
  const cards = document.querySelectorAll(".card");

  loadButton.addEventListener("click", () => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(data => {
        const productos = data.slice(0, 9); 

        productos.forEach((producto, index) => {
          const card = cards[index];

          // Cargar imagenn 
          const img = document.createElement("img");
          img.src = producto.images; 
          img.alt = producto.title;
         
          // Agregar el titulo 
          let titulo = card.querySelector(".card-title");
          if (!titulo) {
            titulo = document.createElement("h5");
            titulo.className = "card-title";
            card.querySelector(".card-body").insertBefore(titulo, card.querySelector(".card-text"));
          }
          titulo.textContent = producto.title;

          // Descripción
          const descripcion = card.querySelector(".card-text");
          descripcion.textContent = producto.description;

          // Precio
          const precio = card.querySelector("small");
          precio.textContent = `$${producto.price}`;
        });
      })
      .catch(error => {
        console.error("Error al cargar productos:", error);
      });
  });
});
