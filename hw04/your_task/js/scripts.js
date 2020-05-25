const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    // clearing the tracks
    document.querySelector('#tracks').innerHTML = '';

    // 1. Build the URL
    let url = 'https://www.apitutor.org/spotify/simple/v1/search?type=track&q=' + term;
    // 2. Issue the fetch
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let counter = 0;

        const error = `
            <p>No tracks are returned for the search query!</p>`;

        if (data.length === 0) {
          document.querySelector('#tracks').innerHTML = error;
          return;
        };

        for (const track of data) {

          // If counter is more than 5, break out of the loop
          if (counter === 5) {
            break;
          };

          // A. Create the template
          const template = `
            <section class="track-item preview" data-preview-track="${track.preview_url}">
                <img src="${track.album.image_url}">
                <i class="fas play-track fa-play" aria-hidden="true"></i>
                <div class="label">
                    <h3>${track.name}</h3>
                    <p>
                    ${track.artist.name}
                    </p>
                </div>
            </section>
          `;
          // B. Figure out which element is the DOM to the target
          document.querySelector('#tracks').innerHTML += template;
          ++counter;
        }

        // Assigning onclick events in order to play each Songs
        const trackElements = document.querySelectorAll('.track-item');
        for (const item of trackElements) {
            item.onclick = (ev) => {
                const preview_url = ev.currentTarget.getAttribute('data-preview-track')
                audioPlayer.setAudioFile(preview_url);
                audioPlayer.play();
                // and update the thumbnail:
                document.querySelector('footer .track-item').innerHTML = ev.currentTarget.innerHTML;
          };
        };
      });
};

const getAlbums = (term) => {
  // clearing the tracks
  document.querySelector('#albums').innerHTML = '';

  // 1. Build the URL
  let url = 'https://www.apitutor.org/spotify/simple/v1/search?type=album&q=' + term;
  // 2. Issue the fetch
  fetch(url)
    .then(response => response.json())
    .then(data => {

      const error = `
          <p>No albums are returned for the search query!</p>`;

      if (data.length === 0) {
        document.querySelector('#albums').innerHTML = error;
        return;
      };

      for (const album of data) {

        // A. Create the template
        const template = `
        <section class="album-card" id="${album.id}">
            <div>
                <img src="${album.image_url}">
                <h3>${album.name}</h3>
                <div class="footer">
                    <a href="${album.spotify_url}" target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>
        `;
        // B. Figure out which element is the DOM to the target
        document.querySelector('#albums').innerHTML += template;
      };
    });
};

const getArtist = (term) => {
  // 1. Build the URL
  let url = 'https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=' + term;
  // 2. Issue the fetch
  fetch(url)
    .then(response => response.json())
    .then(data => {

      const error = `
          <p>No artists are returned for the search query!</p>`;

      if (data.length === 0) {
        document.querySelector('#artist').innerHTML = error;
        return;
      };

      console.log(data[0]);
      const artist = data[0];
      const template = `
        <section class="artist-card" id="${artist.id}">
          <div>
            <img src="${artist.image_url}">
            <h3>${artist.name}</h3>
            <div class="footer">
              <a href="${artist.spotify_url}" target="_blank">
                view on spotify
                </a>
            </div>
          </div>
        </section>`;

        document.querySelector('#artist').innerHTML = template;
    });
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
