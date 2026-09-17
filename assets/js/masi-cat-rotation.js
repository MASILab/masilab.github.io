(function () {
  var cats = [
    "/assets/images/cats/tabby.png",
    "/assets/images/cats/tuxedo.png",
    "/assets/images/cats/orange-white.png",
    "/assets/images/cats/calico.png",
    "/assets/images/cats/ai-imaging-researcher.png",
    "/assets/images/cats/ai-network-researcher.png",
    "/assets/images/cats/ai-notebook-researcher.png",
    "/assets/images/cats/ai-journal-scholar.png",
    "/assets/images/cats/ai-manuscript-scholar.png",
    "/assets/images/cats/ai-library-scholar.png",
    "/assets/images/cats/ai-team-scan-review.png",
    "/assets/images/cats/ai-team-whiteboard.png",
    "/assets/images/cats/ai-team-brain-network.png",
    "/assets/images/cats/ai-team-pipeline.png",
    "/assets/images/cats/ai-team-laptop-review.png",
    "/assets/images/cats/ai-team-scan-panel.png",
    "/assets/images/cats/ai-team-robotic-imaging.png",
    "/assets/images/cats/ai-team-hologram.png",
    "/assets/images/cats/ai-team-study-table.png",
    "/assets/images/cats/ai-team-poster-presentation.png",
    "/assets/images/cats/network-collate.png",
    "/assets/images/cats/network-deep-shore.png",
    "/assets/images/cats/network-slant.png",
    "/assets/images/cats/network-synb0-disco.png",
    "/assets/images/cats/network-synseg-net.png",
    "/assets/images/cats/network-circlenet.png",
    "/assets/images/cats/network-m3net.png",
    "/assets/images/cats/network-swin-unetr.png",
    "/assets/images/cats/network-longitudinal-transformer.png",
    "/assets/images/cats/network-extra-01.png",
    "/assets/images/cats/network-extra-02.png",
    "/assets/images/cats/network-extra-03.png",
    "/assets/images/cats/network-extra-04.png",
    "/assets/images/cats/network-extra-05.png",
    "/assets/images/cats/network-extra-06.png",
    "/assets/images/cats/network-extra-07.png",
    "/assets/images/cats/network-extra-08.png",
    "/assets/images/cats/network-extra-09.png",
    "/assets/images/cats/network-extra-10.png",
    "/assets/images/cats/network-extra-11.png",
    "/assets/images/cats/network-extra-12.png",
    "/assets/images/cats/network-extra-13.png",
    "/assets/images/cats/network-extra-14.png",
    "/assets/images/cats/network-extra-15.png",
  ];

  var images = document.querySelectorAll(".masi-sidebar-cat-image");
  var previous = null;
  var index = Math.floor(Math.random() * cats.length);

  try {
    previous = Number(sessionStorage.getItem("masi-sidebar-cat-index"));
  } catch (error) {
    // Privacy settings can disable session storage; random selection still works.
  }

  if (cats.length > 1 && Number.isInteger(previous)) {
    index = (previous + 1 + Math.floor(Math.random() * (cats.length - 1))) % cats.length;
  }

  try {
    sessionStorage.setItem("masi-sidebar-cat-index", String(index));
  } catch (error) {
    // The selected cat remains visible even if its index cannot be remembered.
  }

  for (var i = 0; i < images.length; i += 1) {
    images[i].src = cats[index];
  }
})();
