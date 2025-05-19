// ---------- Data Structure ----------
const campuses = [
  {
    id: "campus1",
    name: "DLSU-MANILA",
    buildings: [
      { id: "b1", name: "Science Building", rooms: ["101", "102"] },
      { id: "b2", name: "Library", rooms: ["201"] },
    ],
  },
  {
    id: "campus2",
    name: "DLSU-LAGUNA",
    buildings: [
      { id: "b3", name: "Engineering Hall", rooms: ["301", "302", "303"] },
    ],
  },
];

let selectedCampusId = null;
let selectedBuildingId = null;

// ---------- DOM Elements ----------
const campusSelect = document.getElementById("campusSelect");
const buildingsContainer = document.getElementById("buildingsContainer");
const addBuildingBtn = document.getElementById("addBuildingBtn");
const newBuildingNameInput = document.getElementById("newBuildingName");
const roomsModal = document.getElementById("roomsModal");
const roomsModalTitle = document.getElementById("roomsModalTitle");
const roomsList = document.getElementById("roomsList");
const newRoomNameInput = document.getElementById("newRoomName");
const addRoomBtn = document.getElementById("addRoomBtn");
const closeRoomsModal = document.getElementById("closeRoomsModal");
const goToDashboard = document.getElementById("goToDashboard");
const signOutBtn = document.getElementById("signOutBtn");

// ---------- Initialization ----------
function init() {
  populateCampusSelect();
  attachEventListeners();
}

function populateCampusSelect() {
  campusSelect.innerHTML = `<option value="" disabled selected>Select a Campus</option>`;
  campuses.forEach(campus => {
    const option = document.createElement("option");
    option.value = campus.id;
    option.textContent = campus.name;
    campusSelect.appendChild(option);
  });
}

// ---------- Event Listeners ----------
function attachEventListeners() {
  campusSelect.addEventListener("change", handleCampusChange);
  newBuildingNameInput.addEventListener("input", updateAddBuildingBtnState);
  addBuildingBtn.addEventListener("click", addBuilding);
  addRoomBtn.addEventListener("click", addRoom);
  closeRoomsModal.addEventListener("click", closeModal);
  goToDashboard.addEventListener("click", () => window.location.href = "admin_dashboard.html");
  signOutBtn.addEventListener("click", handleSignOut);
}

function handleCampusChange() {
  selectedCampusId = campusSelect.value;
  renderBuildings();
  updateAddBuildingBtnState();
}

function handleSignOut() {
  if (confirm("Are you sure you want to sign out?")) {
    alert("Signed out!");
    // window.location.href = "LoginPage.html";
  }
}

// ---------- Building Functions ----------
function renderBuildings() {
  buildingsContainer.innerHTML = "";
  if (!selectedCampusId) return;

  const campus = campuses.find(c => c.id === selectedCampusId);
  if (!campus) return;

  campus.buildings.forEach(building => {
    const div = document.createElement("div");
    div.className = "p-4 bg-white rounded-lg shadow hover:shadow-lg flex flex-col items-center text-center";

    div.innerHTML = `
      <i data-lucide="building-2" class="text-blue-700 w-10 h-10 mb-2"></i>
      <span class="font-semibold text-gray-900 mb-1">${building.name}</span>
      <span class="text-sm text-gray-600 mb-2">${building.rooms.length} room${building.rooms.length !== 1 ? "s" : ""}</span>
      <div class="flex flex-col gap-1 w-full">
        <button class="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800" onclick="editBuilding('${building.id}')">
          <i data-lucide="pencil-line" class="w-4 h-4"></i><span>Edit</span>
        </button>
        <button class="flex items-center justify-center gap-1 text-red-600 hover:text-red-800" onclick="deleteBuilding('${building.id}')">
          <i data-lucide="trash-2" class="w-4 h-4"></i><span>Delete</span>
        </button>
        <button class="flex items-center justify-center gap-1 text-green-600 hover:text-green-800" onclick="openRoomsModal('${building.id}')">
          <i data-lucide="door-open" class="w-4 h-4"></i><span>Rooms</span>
        </button>
      </div>
    `;

    buildingsContainer.appendChild(div);
  });

  lucide.createIcons();
}

function updateAddBuildingBtnState() {
  addBuildingBtn.disabled = !newBuildingNameInput.value.trim() || !selectedCampusId;
}

function addBuilding() {
  const name = newBuildingNameInput.value.trim();
  if (!name || !selectedCampusId) return;

  const campus = campuses.find(c => c.id === selectedCampusId);
  const duplicate = campus.buildings.some(b => b.name.toLowerCase() === name.toLowerCase());
  if (duplicate) {
    alert("A building with this name already exists.");
    return;
  }

  const newId = "b" + Date.now();
  campus.buildings.push({ id: newId, name, rooms: [] });

  newBuildingNameInput.value = "";
  updateAddBuildingBtnState();
  renderBuildings();
}

function editBuilding(buildingId) {
  const campus = campuses.find(c => c.id === selectedCampusId);
  const building = campus.buildings.find(b => b.id === buildingId);

  const newName = prompt("Enter new name for building:", building.name);
  if (newName && newName.trim()) {
    building.name = newName.trim();
    renderBuildings();
  }
}

function deleteBuilding(buildingId) {
  if (!confirm("Are you sure you want to delete this building?")) return;

  const campus = campuses.find(c => c.id === selectedCampusId);
  campus.buildings = campus.buildings.filter(b => b.id !== buildingId);

  renderBuildings();
}

// ---------- Room Modal Functions ----------
function openRoomsModal(buildingId) {
  selectedBuildingId = buildingId;

  const campus = campuses.find(c => c.id === selectedCampusId);
  const building = campus.buildings.find(b => b.id === buildingId);

  roomsModalTitle.textContent = `Manage Rooms for "${building.name}"`;
  renderRooms(building.rooms);
  newRoomNameInput.value = "";
  roomsModal.classList.remove("hidden");
}

function closeModal() {
  roomsModal.classList.add("hidden");
  selectedBuildingId = null;
}

function renderRooms(rooms) {
  roomsList.innerHTML = "";

  if (rooms.length === 0) {
    roomsList.innerHTML = '<p class="text-gray-500 italic">No rooms added yet.</p>';
    return;
  }

  rooms.forEach((room, idx) => {
    const div = document.createElement("div");
    div.className = "bg-white border p-2 rounded flex justify-between items-center gap-2";

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <i data-lucide="door-open" class="w-4 h-4 text-blue-700"></i>
        <span class="text-sm">${room}</span>
      </div>
      <div class="flex gap-2">
        <button class="text-blue-500 hover:text-blue-700" onclick="editRoom(${idx}, '${room}')">
          <i data-lucide="pencil" class="w-4 h-4"></i>
        </button>
        <button class="text-red-500 hover:text-red-700" onclick="removeRoom(${idx})">
          <i data-lucide="trash" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    roomsList.appendChild(div);
  });

  lucide.createIcons();
}

function addRoom() {
  const roomName = newRoomNameInput.value.trim();
  if (!roomName) return;

  const campus = campuses.find(c => c.id === selectedCampusId);
  const building = campus.buildings.find(b => b.id === selectedBuildingId);

  if (building.rooms.includes(roomName)) {
    alert("Room already exists.");
    return;
  }

  building.rooms.push(roomName);
  newRoomNameInput.value = "";
  renderRooms(building.rooms);
  renderBuildings();
}

function editRoom(idx, currentName) {
  const newName = prompt("Rename room:", currentName);
  if (newName && newName.trim()) {
    updateRoom(idx, newName.trim());
  }
}

function updateRoom(idx, newName) {
  const campus = campuses.find(c => c.id === selectedCampusId);
  const building = campus.buildings.find(b => b.id === selectedBuildingId);

  if (building.rooms.includes(newName)) {
    alert("Room with that name already exists.");
    return;
  }

  building.rooms[idx] = newName;
  renderRooms(building.rooms);
  renderBuildings();
}

function removeRoom(idx) {
  const campus = campuses.find(c => c.id === selectedCampusId);
  const building = campus.buildings.find(b => b.id === selectedBuildingId);

  building.rooms.splice(idx, 1);
  renderRooms(building.rooms);
  renderBuildings();
}

// ---------- Start ----------
init();
