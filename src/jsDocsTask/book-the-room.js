class Hotel {
  constructor() {
    this.rooms = [];
    this.bookedRooms = [];
  }

  createRoom(roomNumber) {
    if (!this.rooms.includes(roomNumber)) {
      this.rooms.push(roomNumber);
      alert(`Room ${roomNumber} created successfully!`);
    } else {
      alert(`Room ${roomNumber} already exists!`);
    }
  }

  bookRoom(roomNumber) {
    if (
      this.rooms.includes(roomNumber) &&
      !this.bookedRooms.includes(roomNumber)
    ) {
      this.bookedRooms.push(roomNumber);
      this.displayBookedRooms();
      alert(`Room ${roomNumber} booked successfully!`);
    } else {
      alert(`Room ${roomNumber} is not available or already booked.`);
    }
  }

  displayBookedRooms() {
    const bookedRoomsList = document.getElementById('bookedRoomsList');
    bookedRoomsList.innerHTML = '';
    if (this.bookedRooms.length === 0) {
      bookedRoomsList.innerHTML = 'No rooms booked.';
    } else {
      this.bookedRooms.forEach(room => {
        const roomElement = document.createElement('p');
        roomElement.textContent = `Room ${room}`;
        bookedRoomsList.appendChild(roomElement);
      });
    }
  }
}

const hotel = new Hotel();

const createRoomBtn = document.getElementById('createRoom');
const roomNumber = document.getElementById('roomNumber');
const bookRoomBtn = document.getElementById('bookRoom');
const bookRoomNumber = document.getElementById('bookRoomNumber');

createRoomBtn.addEventListener('click', () => {
  if (isNaN(roomNumber.value) || roomNumber.value.trim() === '') {
    roomNumber.value = '';
    return alert('Please enter a valid room number (numbers only).');
  }
  hotel.createRoom(roomNumber.value);
  roomNumber.value = '';
});

bookRoomBtn.addEventListener('click', () => {
  if (isNaN(bookRoomNumber.value) || bookRoomNumber.value.trim() === '') {
    bookRoomNumber.value = '';
    return alert('Please enter a valid room number (numbers only).');
  }
  hotel.bookRoom(bookRoomNumber.value);
  bookRoomNumber.value = '';
});
