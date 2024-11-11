class Movie {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}

const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const countDisplay = document.getElementById('count');
const totalDisplay = document.getElementById('total');

let movies = [];

//hämtar data från länken
fetch('https://gist.githubusercontent.com/aspcodenet/32a21ce9d8b8ccf19108a8a02883e9bb/raw/785f9bcb1527cb01e182d3fe40ffafd6fd00dac9/movies.json')
    .then(response => response.json())
    .then(data => {
        movies = data.map(movie => new Movie(movie.Title, movie.Price));
        populateMovieSelect();
    });

function populateMovieSelect() {
    movies.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.price;
        option.textContent = `${movie.title} (${movie.price} kr)`;
        movieSelect.appendChild(option);
    });
}

//uppdaterar totala priset och antal säten
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatCount = selectedSeats.length;

    countDisplay.textContent = seatCount;
    totalDisplay.textContent = seatCount * movieSelect.value;
}

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('occupied')) { //kontroll för att endast valbara stolar kan väljas
            seat.classList.toggle('selected'); //växlar mellan att markera och avmarkera stolen
            updateSelectedCount(); //uppdaterar total antal och pris
        }
    });
});

movieSelect.addEventListener('change', updateSelectedCount);

updateSelectedCount();
