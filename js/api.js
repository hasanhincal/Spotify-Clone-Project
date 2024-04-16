import { renderSongs } from "./ui.js";

const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR&pageSize=10&startFrom=0";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "eb6c2fff0dmsh61bd7071add4938p106fe0jsn2bd7e1296af8",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
//*API isteklerini yönettiğimiz class yapısı
export class API {
  constructor() {
    this.songs = [];
  }
  //*Popüler müzikleri getirir.
  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();
    //*API'den aldığımız sarkıları song dizisine aktardık.
    this.songs = data.tracks;
    //*Ekrana popüler müzikleri aktaracak fonk. song dizisini parametre olarak gönderdik.
    renderSongs(this.songs);
  }

  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
      options
    );
    const data = await res.json();
    //*veriyi istediğimiz hale cevirme,
    //*song.track yerine song'a erişme,
    const newData = data.tracks.hits.map((song) => ({ ...song.track }));
    this.songs = newData;
    console.log(this.songs);
    //*aratılan sarkıları ekrana basma
    renderSongs(this.songs);
  }
}
