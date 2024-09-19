class Hotel {
  constructor() {
    this.rooms = new Set();
    this.bookedRooms = new Set();
    this.notificationElement = document.getElementById('notification');
  }

  showNotification(message, success = true) {
    this.notificationElement.textContent = message;
    this.notificationElement.style.color = success ? 'green' : 'red';
    this.notificationElement.classList.remove('hidden');

    setTimeout(() => {
      this.notificationElement.classList.add('hidden');
    }, 3000);
  }

  createRoom(roomNumber) {
    if (!this.rooms.has(roomNumber)) {
      this.rooms.add(roomNumber);
      this.showNotification(`Room ${roomNumber} created successfully!`, true);
    } else {
      this.showNotification(`Room ${roomNumber} already exists!`, false);
    }
  }

  bookRoom(roomNumber) {
    if (this.rooms.has(roomNumber) && !this.bookedRooms.has(roomNumber)) {
      this.bookedRooms.add(roomNumber);
      this.displayBookedRooms();
      this.showNotification(`Room ${roomNumber} booked successfully!`, true);
    } else {
      this.showNotification(
        `Room ${roomNumber} is not available or already booked.`,
        false
      );
    }
  }

  displayBookedRooms() {
    const bookedRoomsList = document.getElementById('bookedRoomsList');
    bookedRoomsList.innerHTML =
      this.bookedRooms.size === 0
        ? 'No rooms booked.'
        : Array.from(this.bookedRooms)
            .map(room => `<p>Room ${room}</p>`)
            .join('');
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
    hotel.showNotification(
      'Please enter a valid room number (numbers only).',
      false
    );
    return;
  }
  hotel.createRoom(roomNumber.value);
  roomNumber.value = '';
});

bookRoomBtn.addEventListener('click', () => {
  if (isNaN(bookRoomNumber.value) || bookRoomNumber.value.trim() === '') {
    bookRoomNumber.value = '';
    hotel.showNotification(
      'Please enter a valid room number (numbers only).',
      false
    );
    return;
  }
  hotel.bookRoom(bookRoomNumber.value);
  bookRoomNumber.value = '';
});
