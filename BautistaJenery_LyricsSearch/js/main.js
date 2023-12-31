const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')

// Api URL
const apiURL = 'https://api.lyrics.ovh';

// Adding event listener in form
form.addEventListener('submit', e=> {
    e.preventDefault();
    searchValue = search.value.trim();
    // Checking search value is empty or not
    if(!searchValue){
        alert("There is nothing to search")
    }
    else{
        searchSong(searchValue)
    }
})

//Search song

async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();
    showData(data);
}

// Updating DOM
function showData(data) {
    result.innerHTML = `
    <ul class="song-list">
    ${data.data.map(song=> `<li>
                            <div>
                                <strong>
                                ${song.artist.name}
                                </strong> -${song.title}
                            </div>
                            <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                                get lyrics
                            </span>
                            </li>`
        ).join('')
    }
    </ul>
    `
}

// Event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;
    // Checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})

// Get Lyrics
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')

    result.innerHTML = `<h2> <strong>
                            ${artist}
                            </strong> -${songTitle}
                       </h2>
                       <p>${lyrics}</p>
                       `
}