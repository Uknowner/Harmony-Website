fetch("/lib/gallery.json")
  .then(res => {
    if (!res.ok) throw new Error("Network error");
    return res.json();
  })
  .then(data => {

    const gallery = document.querySelector(".gallery");

    // Proper empty check
    const isEmpty =
      !data ||
      Object.keys(data).length === 0 ||
      Object.values(data).every(arr => !Array.isArray(arr) || arr.length === 0);

    if (isEmpty) {
      const noteContainer = document.createElement("div");
      noteContainer.classList.add("end-message");

      const note1 = document.createElement("p");
      note1.textContent = "Our gallery is currently empty";

      const note2 = document.createElement("p");
      note2.textContent = "Come back later to see updates from us.";

      noteContainer.appendChild(note1);
      noteContainer.appendChild(note2);
      gallery.appendChild(noteContainer);

      return;
    }

    let srcs = [
      ["static/images/building/building_view1.webp", "Building exterior view 1"],
      ["static/images/rooms/room2.webp", "Building interior view"],
      ["static/images/other/braii_area.webp", "Outdoor braai area"]
    ];

    srcs.forEach(([src, alt]) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      gallery.appendChild(img);
    });

    // Button
    const galleryBtnContainer = document.createElement("div");
    galleryBtnContainer.classList.add("gallery-btn-container");

    const galleryBtn = document.createElement("a");
    galleryBtn.href = "templates/gallery.html";
    galleryBtn.classList.add("btn");
    galleryBtn.textContent = "Open Gallery";

    galleryBtnContainer.appendChild(galleryBtn);
    gallery.appendChild(galleryBtnContainer);

  })
  .catch(() => {
    const gallery = document.querySelector(".gallery");

    const error = document.createElement("div");
    error.classList.add("end-message");
    error.textContent = "Failed to load gallery. Gallery may be empty";

    gallery.appendChild(error);
  });
  