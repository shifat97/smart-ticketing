const nav3bar = document.getElementById('nav-3-bar');
const nav3items = document.getElementById('nav-3-items');
const seatAvailable = document.getElementById('seat-available');
const seats = document.getElementsByClassName('seat');
const bookingListContainer = document.getElementById('booking-list-container');
const seatCount = document.getElementById('seat-count');
const totalPrice = document.getElementById('total-price');
const couponApplyButton = document.getElementById('coupon-apply-btn');

let bookedSeatList = [];

let maxBooking = 0;

// Navigation menu for mobile version
nav3bar.addEventListener('click', function () {
    nav3items.classList.toggle('hidden');
})

// Get each seat
for (let seat of seats) {
    seat.addEventListener('click', function (event) {
        getSeatById(event.target.id);
    })
}

// This function checks if seat is already in book list or not.
// Also user cannot add more than 4 seats to book list.
// Decrement total seat left after booking a seat.
function getSeatById(seatId) {
    if (bookedSeatList.includes(seatId)) { // check if seat is already in let bookedSeatList = [];
        return;
    }

    maxBooking++; // Increase booking list by 1
    if (maxBooking > 4) {
        alert('You cannot add more than 4 seat.')
        return;
    }

    bookedSeatList.push(seatId); // add seat to bookedSeatList = [];
    totalSeatsLeft(); // Decrement total seat left by 1
    addToBookingList(seatId);
    const getSeat = document.getElementById(seatId);
    getSeat.classList.add('bg-green'); // Adds green color after click on seats
}

// This function decrement total seat by 1.
function totalSeatsLeft() {
    const totalSeat = parseInt(seatAvailable.textContent);
    const remainSeat = totalSeat - 1;
    seatAvailable.textContent = remainSeat;
}

// This function add booked seat to booked list container.
// Shows total of seat booked
function addToBookingList(seatId) {
    const totalSeatBooked = parseInt(seatCount.textContent) + 1; // Increase seat count by 1
    seatCount.textContent = totalSeatBooked; 
    const seat = `
    <tr>
        <td class="text-16 pt-2">${seatId}</td>
        <td class="text-16 pt-2">Economy</td>
        <td class="text-16 text-right pt-2">550</td>
    </tr>
    `
    bookingListContainer.insertAdjacentHTML('beforeend', seat);
    calculateTotalPrice();
    // checkEligibleForCoupon(totalSeatBooked);
}

// This function enables coupon apply button if user book 4 seats.
// function checkEligibleForCoupon(totalSeatBooked) {
//     if (totalSeatBooked === 4) {
//         couponApplyButton.removeAttribute('disabled');
//     } 
// }

// couponApplyButton.addEventListener('click', function () {
//     console.log('Hello');
// })

// This function calculates the total price.
function calculateTotalPrice() {
    const currentTotal = parseFloat(totalPrice.textContent);
    totalPrice.textContent = currentTotal + 550; // Increment total price by adding 550 each.
}