document.addEventListener("DOMContentLoaded", () => {
  const properties = {
    "land-1": {
      title: "Land 1",
      location: "Obagie, Benin City",
      price: "₦45,000,000",
      size: "600 SQM",
      use: "Residential",
      titleType: "C of O",
      topography: "Dry Land",
      description:
        "Land 1 is a dry, well-drained land located in a fast-developing area. Ideal for residential homes and long-term investment.",
      video: "Videos/land1.mp4",
      thumbnail: "Images/land1.png"
    },

    "land-2": {
      title: "Land 2",
      location: "NIFOR, Benin City",
      price: "₦47,000,000",
      size: "10,000 SQM",
      use: "Residential",
      titleType: "C of O",
      topography: "Dry Land",
      description:
        "Land 2 is a dry, well-drained land located in a fast-developing area. Ideal for residential homes and long-term investment.",
      video: "Videos/land1.mp4",
      thumbnail: "Images/land2.png"
    },
    "land-3": {
      title: "Land 3",
      location: "Evbuowe, Airport Road Axis, Benin City",
      price: "₦10,000,000",
      size: "465 SQM",
      use: "Commercial",
      titleType: "C of O",
      topography: "Dry Land",
      description:
        "Land 3 is a dry, well-drained land located in a fast-developing area. Ideal for commercial ventures and long-term investment.",
      video: "Videos/land1.mp4",
      thumbnail: "Images/land3.png"
    },
    "land-4": {
      title: "Land 4",
      location: " Upper Ekenwan Road, Okezi Community, Benin City",
      price: "₦8,500,000",
      size: "930 SQM",
      use: "Residential/Commercial",
      titleType: "C of O",
      topography: "Dry Land",
      description:
        "Land 4 is a dry, well-drained land located in a fast-developing area. Ideal for commercial ventures and long-term investment.",
      video: "Videos/land1.mp4",
      thumbnail: "Images/land4.png"
    }

  };

  let currentVideo = "";
  let currentThumbnail = "";

  const modal = document.getElementById("property-modal");
  const videoContainer = document.getElementById("video-container");

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "";
  }

  function resetVideoThumbnail() {
    if (!videoContainer) return;

    videoContainer.innerHTML = `
      <div class="video-thumbnail">
        <img id="property-thumbnail" src="${currentThumbnail}" alt="Property preview" loading="lazy">
        <div class="play-button">▶</div>
      </div>
    `;

    videoContainer
      .querySelector(".video-thumbnail")
      .addEventListener("click", playVideo);
  }

  function openPropertyModal(id) {
    const property = properties[id];
    if (!property) return;

    currentVideo = property.video;
    currentThumbnail = property.thumbnail;

    setText("property-title", property.title);
    setText("property-location", property.location);
    setText("property-description", property.description);

    setText("property-price", property.price);
    setText("property-size", property.size);
    setText("property-use", property.use);
    setText("property-title-type", property.titleType);
    setText("property-topography", property.topography);

    setText("side-location", property.location);
    setText("side-size", property.size);
    setText("side-use", property.use);
    setText("side-title-type", property.titleType);

    resetVideoThumbnail();

    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  function playVideo() {
    if (!videoContainer) return;

    videoContainer.innerHTML = `
      <video 
        src="${currentVideo}" 
        controls 
        autoplay 
        playsinline
        style="width:100%; height:100%; object-fit:contain; background:black;">
      </video>
    `;
  }

function closePropertyModal() {
  if (!modal) return;

  modal.classList.remove("show");
  document.body.style.overflow = "";
  resetVideoThumbnail();
}

  // Makes them work with onclick="" in your HTML
  window.openPropertyModal = openPropertyModal;
  window.closePropertyModal = closePropertyModal;
  window.playVideo = playVideo;

});
function animateCount(id, target, duration = 1000) {
  const element = document.getElementById(id);

  if (!element) return; // prevents error on pages without land-count

  let start = 0;
  const increment = target / (duration / 16);

  function updateCount() {
    start += increment;

    if (start >= target) {
      element.textContent = target;
      return;
    }

    element.textContent = Math.floor(start);
    requestAnimationFrame(updateCount);
  }

  updateCount();
}

document.addEventListener("DOMContentLoaded", () => {
  animateCount("land-count", 6);
});


function filterLands() {

  const location =
    document.getElementById("locationFilter")?.value || "all";

  const size =
    document.getElementById("sizeFilter")?.value || "all";

  const price =
    document.getElementById("priceFilter")?.value || "all";

const cards = document.querySelectorAll(".land-card");

let visibleCount = 0;

cards.forEach(card => {

    const cardLocation = card.dataset.location;
    const cardSize = Number(card.dataset.size);
    const cardPrice = Number(card.dataset.price);

    const matchesLocation =
      location === "all" || cardLocation === location;

    const matchesSize =
      size === "all" ||
      (size === "300-600" &&
        cardSize >= 300 &&
        cardSize <= 600) ||

      (size === "600-1000" &&
        cardSize > 600 &&
        cardSize <= 1000) ||

      (size === "1000-plus" &&
        cardSize > 1000);

    const matchesPrice =
      price === "all" ||

      (price === "below-10m" &&
        cardPrice < 10000000) ||

      (price === "10m-50m" &&
        cardPrice >= 10000000 &&
        cardPrice <= 50000000) ||

      (price === "50m-plus" &&
        cardPrice > 50000000);

const shouldShow =
  matchesLocation &&
  matchesSize &&
  matchesPrice;

card.style.display = shouldShow ? "block" : "none";

if (shouldShow) {
  visibleCount++;
}
const noResults =
  document.getElementById("noResultsMessage");

if (noResults) {
  noResults.classList.toggle(
    "hidden",
    visibleCount !== 0
  );
}

  });
}

document
  .getElementById("filterBtn")
  ?.addEventListener("click", filterLands);