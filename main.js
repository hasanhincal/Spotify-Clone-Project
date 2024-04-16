import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();
api.getPopular();
// * Sayfa yüklendiği anda API'ye istek atıp ppopüler müzikleri getirir.
document.addEventListener(
  "DOMContentLoaded",
  async () => await api.getPopular()
);

const playMusic = (url) => {
  //*Müziğin url'sini html'e aktarır.
  elements.audioSource.src = url;
  //*Audio elementinin müziği yüklemesini sağladık.
  elements.audio.load();
  //*audio elementinin müziği oynatmasını sağlar.
  elements.audio.play();
};

//*Listede tıklamalarda çalışır.
const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card"); //*Parent element yerine kullanırız en yakın ebeveyne götürür.Parent element yazmayız.
    //*Çalınacak müziğin bilgilerini ekrana basar.
    renderPlayingInfo(parent.dataset);
    //*müziği çalar
    playMusic(parent.dataset.url);
  }
};
//*fotoğrafı döndürür.
const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};
//*img etiketine eklediğimiz animate clasını kaldırır.
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};

//*Liste alanındaki tıklanmaları izleme,
document.addEventListener("click", handleClick);

//*müziği çalma ve durdurma olaylarını izler.
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) {
    alert("Lütfen Bütün Alanları Doldurunuz...");
    return;
  }
  //*Başlığı güncelle,
  updateTitle(`${query} İçin Sonuçlar...`);
  api.searchMusic(query);
});

//*menu olay izleyicisi;
elements.menu.addEventListener("click", () => {
  elements.ulList.classList.toggle("toggle");
});
