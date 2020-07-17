const container = document.querySelector(".movie-container");
const seat = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelected = document.getElementById("movie");

let ticketprice = +movieSelected.value;
populateUI();
function seatMovieDetail(movieIndex, movieValue) {
  localStorage.setItem("SelectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMovieValue", movieValue);
}

function updateSelectedCount() {
  const selectedseat = document.querySelectorAll(".row .seat.selected");

  const seatIndex = [...selectedseat].map((seats) => [...seat].indexOf(seats));

  localStorage.setItem("SelectedSeat", JSON.stringify(seatIndex));

  const selectedseatcount = selectedseat.length;
  count.innerText = selectedseatcount;
  total.innerText = selectedseatcount * ticketprice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("SelectedSeat"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seat.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

movieSelected.addEventListener("change", (e) => {
  ticketprice = +e.target.value;
  seatMovieDetail(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

updateSelectedCount();
