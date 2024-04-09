const mainContainer = document.getElementById('main-container');
const seatContainer = document.getElementById('seat-container');
const footerContainer = document.getElementById('footer-container');
const successContainer = document.getElementById('success-container');
const nav3bar = document.getElementById('nav-3-bar');
const nav3items = document.getElementById('nav-3-items');
const seatAvailable = document.getElementById('seat-available');
const seats = document.getElementsByClassName('seat');
const bookingListContainer = document.getElementById('booking-list-container');
const seatCount = document.getElementById('seat-count');
const totalPrice = document.getElementById('total-price');
const grandTotal = document.getElementById('grand-total');
const couponApplyButton = document.getElementById('coupon-apply-btn');
const coupon1 = document.getElementById('coupon-1');
const coupon2 = document.getElementById('coupon-2');
const couponInputElement = document.getElementById('coupon');
const couponInputContainer = document.getElementById('coupon-input-container');
const discountPrice = document.getElementById('discount-price');
const showDiscountPrice = document.getElementById('show-discount-price');
const userPhone = document.getElementById('userphone');
const numberWarning = document.getElementById('number-warning');
const paymentNext = document.getElementById('payment-next');
const continueButton = document.getElementById('continue-button');

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
    totalSeatsLeft(); // Check for total seat left
    addToBookingList(seatId);
    const getSeat = document.getElementById(seatId);
    getSeat.classList.add('bg-green'); // Adds green color after click on seats
}

// This function decrement total seat by 1.
function totalSeatsLeft() {
    const totalSeat = parseInt(seatAvailable.textContent);
    const remainSeat = totalSeat - 1; // Decrease total seat available by 1
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
    checkEligibleForCoupon(totalSeatBooked);
}

// This function enables coupon apply button if user book 4 seats.
function checkEligibleForCoupon(totalSeatBooked) {
    if (totalSeatBooked === 4) {
        couponApplyButton.removeAttribute('disabled');
    }
}

// This event checks for coupon validity on apply click.
// Calculates the total discount price.
// Calculates grand total after getting discount price.
couponApplyButton.addEventListener('click', function () {
    const couponCode1 = coupon1.textContent;
    const couponCode2 = coupon2.textContent;
    const couponInputElementValue = couponInputElement.value;
    const getGrandTotal = parseFloat(grandTotal.textContent);

    let discount;
    let grandTotalDiscount;

    if (couponInputElementValue === '') { // Check if coupon field is empty
        alert('Please enter your coupon code!');
        return;
    } else if (!((couponInputElementValue === couponCode1) || (couponInputElementValue === couponCode2))) { // Check if coupon code is valid or not
        alert('Your coupon code is not valid!');
        return;
    } else if (couponInputElementValue === couponCode1) {
        discount = calculateDiscount(15, getGrandTotal); // Calculates the total discount
    } else if (couponInputElementValue === couponCode2) {
        discount = calculateDiscount(20, getGrandTotal); // Calculates the total discount
    }
    const div = `
            <div class="flex justify-between">
                <p class="font-semibold">Discount</p>
                <p class="text-right text-16 font-semibold">- <span id="discount-price">${discount}</span></p>
            </div>
        `
    showDiscountPrice.insertAdjacentHTML('beforeend', div);

    grandTotalDiscount = getGrandTotal - discount; // Subtract discount from grand total
    setGranTotalPrice(grandTotalDiscount); // Add discounted grand total price
    couponInputContainer.classList.add('hidden'); // Hide the coupon field after applying
})

// This function calculates the discount.
function calculateDiscount(discountPercent, getGrandTotal) {
    return ((discountPercent / 100) * getGrandTotal);
}

// This function calculates the total price.
function calculateTotalPrice() {
    const currentTotal = parseFloat(totalPrice.textContent);
    totalPrice.textContent = currentTotal + 550; // Increment total price by adding 550 each
    setGranTotalPrice(totalPrice.textContent);
}

// This function calculates the grand total price.
function setGranTotalPrice(grandTotalPrice) {
    grandTotal.textContent = grandTotalPrice; // Add total price to grand total
}

// This event check if user eligible for next process or not.
// User must book 1 seat and must submit his number.
userPhone.addEventListener('keyup', function () {
    const getUserPhone = userPhone.value;
    if (isNaN(getUserPhone) || getUserPhone == '') { // Checks if number field is empty 
        numberWarning.classList.remove('hidden');
        return;
    }
    numberWarning.classList.add('hidden');
    paymentNext.removeAttribute('disabled');

    paymentNext.addEventListener('click', function () {
        if (maxBooking < 1) { // Check for at least 1 seat booking
            alert('Please book at least 1 seat!');
            return;
        }
        nextProcess();
    })
})


// Hide the main body and show the modal.
function nextProcess() {
    mainContainer.classList.add('hidden');
    seatContainer.classList.add('hidden');
    footerContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
}

// Hide the modal and show the main body.
continueButton.addEventListener('click', function () {
    mainContainer.classList.remove('hidden');
    seatContainer.classList.remove('hidden');
    footerContainer.classList.remove('hidden');
    successContainer.classList.add('hidden');
})
