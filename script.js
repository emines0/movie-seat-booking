const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; //+convert to number

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', JSON.stringify(movieIndex));
  localStorage.setItem('selectedMoviePrice', JSON.stringify(moviePrice));
}


//Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into array, Map through array, Return a new array of indexes
  //spread operator add each value from the secetedSeats to the array
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

}

//Get data from local storage and populate in UI
function populateUI() {

}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && 
     !e.target.classList.contains('occupied')) {

      e.target.classList.toggle('selected');
      updateSelectedCount();
  }
});