const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';


//search by song or artist
async function searchSongs (searchTerm) {
  const reponse = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await reponse.json();
  
  showData(data);
}

//show the data after the request
function showData (data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data.map(song =>
        `<li class="">
          <span>
            <strong>${song.artist.name}</strong>
            ${song.title}
          </span>
          <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`).join("")}
    </ul>
    `;

    if (data.prev || data.next) {
      more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ""}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ""}
      `;
    } else {
      more.innerHTML = "";
    }
}

//get more songs if there are songs
async function getMoreSongs (url) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();

  showData(data);
}

//get the lyrics of the selected song
async function getLyrics (artist, songTitle) {
  console.log(artist, songTitle);
  const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await response.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2><span>${lyrics}</span>`;
  more.innerHTML = "";
}

//event listeners
form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

//get lyrics button click
result.addEventListener("click", e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});