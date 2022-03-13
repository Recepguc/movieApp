const container =document.querySelector(".container");
const allSeats=document.querySelectorAll(".container .seat");
const notOccupiedSeats= document.querySelector(".container .seat:not(occupied)");
const count =document.getElementById("count");
const film =document.getElementById("film");
const total=document.getElementById("total");
const movieSelectBox =document.getElementById("movie")

let currentTicketPrice = localStorage.getItem("selectedMoviePrice") ? localStorage.getItem("selectedMoviePrice") : movieSelectBox.options[movieSelectBox.selectedIndex].value;

let currentMovieIndex = localStorage.getItem("selectedMovieIndex") ? localStorage.getItem("selectedMovieIndex") : movieSelectBox.selectedIndex;

window.onload = () =>{
    movieSelectBox.selectedIndex =currentMovieIndex;
    updateMovieInfo();
}


movieSelectBox.addEventListener("change",(e) =>{
    let ticketprice = e.target.value;
    let movieIndex = e.target.selectedIndex;
    // console.log(ticketprice);
    // console.log(movieIndex);
    updateMovieInfo();
    setMovieDataToLocalStorage(ticketprice,movieIndex);
});

const setMovieDataToLocalStorage = (ticketprice,movieIndex)=>{
    localStorage.setItem("selectedMovieIndex",movieIndex)
    localStorage.setItem("selectedMoviePrice",ticketprice);
    
}

container.addEventListener("click",(e)=>{
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
    }
    if(e.target.classList.contains("seat") && e.target.classList.contains("occupied")){
        alert("Lütfen rezerve olmayan bir koltuk seçiniz");

    }
    updateMovieInfo();
})

const updateMovieInfo =() => {
    let selectedSeats =document.querySelectorAll(".row .seat.selected");
    let selectedSeatsIndexArray = [...selectedSeats].map(seat =>[...allSeats].indexOf(seat));

    // console.log(selectedSeatsIndexArray);
    localStorage.setItem("selectedSeats",JSON.stringify(selectedSeatsIndexArray));

    count.innerText = selectedSeatsIndexArray.length;
    total.innerText = selectedSeatsIndexArray.length * movieSelectBox.value;
    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];
}





