document.addEventListener("DOMContentLoaded", () => {
  const properties = {
    "golden-park": {
      title: "Golden Park Estate",
      location: "Obagie, Benin City",
      price: "₦45,000,000",
      size: "600 SQM",
      use: "Residential",
      titleType: "C of O",
      topography: "Dry Land",
      description:
        "Golden Park Estate is a dry, well-drained land located in a fast-developing area. Ideal for residential homes and long-term investment.",
      video: "Videos/land1.mp4",
      thumbnail: "Images/land1.png"
    },

    "Epe-Prime-Land": {
      title: "Epe Prime Land",
      location: "Ibeju-Lekki, Lagos",
      price: "₦47,000,000",
      size: "600 SQM",
      use: "Residential",
      titleType: "C of O",
      topography: "Dry Land",
      description:
        "Epe Prime land is a dry, well-drained land located in a fast-developing area. Ideal for residential homes and long-term investment.",
      video: "Videos/land1.mp4",
      thumbnail: "Images/land2.png"
    },
    "Commercial-Hub-Land": {
      title: "Commercial Hub Land",
      location: "Ibeju-Lekki, Lagos",
      price: "₦10,000,000",
      size: "600 SQM",
      use: "Residential",
      titleType: "C of O",
      topography: "Dry Land",
      description:
        "Commercial Hub Land is a dry, well-drained land located in a fast-developing area. Ideal for commercial ventures and long-term investment.",
      video: "Videos/land1.mp4",
      thumbnail: "Images/land3.png"
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
    modal.classList.remove("show");
    document.body.style.overflow = "";
    resetVideoThumbnail();
  }

  // Makes them work with onclick="" in your HTML
  window.openPropertyModal = openPropertyModal;
  window.closePropertyModal = closePropertyModal;
  window.playVideo = playVideo;
});