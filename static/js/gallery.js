const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

fetch("/Harmony-Website/lib/gallery.json")
  .then(res => res.json())
  .then(data => {
    const gallery = document.querySelector(".gallery");

    Object.entries(data).forEach(([category, images]) => {

      let card = document.createElement("div");
      card.classList.add("card");
      
      let header = document.createElement("h2");
      const upperCasedCategory = category[0].toUpperCase() + category.slice(1);
      header.textContent = upperCasedCategory;
      card.appendChild(header);
      
      let imageGrid = document.createElement("div");
      imageGrid.classList.add("image-grid");
      card.appendChild(imageGrid);      

      images.forEach(image => {
        let img = document.createElement("img");

        img.src = `../static/images/${category}/${image.src}`;
        img.alt = image.alt;

        img.addEventListener("click", () => {
          lightbox.classList.add("active");
          lightboxImg.src = img.src;
        });

        imageGrid.appendChild(img);
      });

      gallery.appendChild(card);
    });
  });

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});
