const devices = [];
let editingIndex = -1;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addDeviceBtn").addEventListener("click", addDevice);
  document.getElementById("saveEditBtn").addEventListener("click", saveEditedDevice);
  document.getElementById("cancelEditBtn").addEventListener("click", closeEditModal);
  document.getElementById("signOutBtn").addEventListener("click", signOut);
  document.getElementById("returnBtn").addEventListener("click", goToDashboard);
  document.getElementById("statusFilter").addEventListener("change", filterDevices);
  document.getElementById("deviceContainer").addEventListener("click", deviceContainerClickHandler);
  updateDeviceList();
});

function addDevice() {
  const id = document.getElementById("deviceId").value.trim();
  const name = document.getElementById("deviceName").value.trim();
  const room = document.getElementById("roomAssigned").value.trim();
  const status = document.getElementById("deviceStatus").value;
  const remarks = document.getElementById("deviceRemarks").value.trim();

  if (!id || !name || !room || !status) {
    alert("Please fill in all fields.");
    return;
  }

  // Prevent duplicate device IDs
  if (devices.some(device => device.id === id)) {
    alert("Device ID already exists.");
    return;
  }

  const newDevice = { id, name, room, status, remarks };
  devices.push(newDevice);
  updateDeviceList();
  clearAddForm();
  showNotification("Device added!");
}

function updateDeviceList() {
  const container = document.getElementById("deviceContainer");
  container.innerHTML = "";

  const filterValue = document.getElementById("statusFilter").value;
  const filteredDevices = filterValue === "All"
    ? devices
    : devices.filter(device => device.status === filterValue);

  if (filteredDevices.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>No devices match the selected filter.</p>";
    return;
  }

  filteredDevices.forEach((device, index) => {
    const div = document.createElement("div");
    div.className = "p-4 bg-gray-50 border-l-4 rounded shadow-sm space-y-1";
    div.dataset.deviceIndex = index;

    let statusClass = "bg-gray-500";
    let textColor = "text-white";
    if (device.status === "Online") statusClass = "bg-green-600";
    else if (device.status === "Offline") statusClass = "bg-red-600";
    else if (device.status === "Under Maintenance") {
      statusClass = "bg-yellow-400";
      textColor = "text-black";
    }

    div.innerHTML = `
      <p><strong>ID:</strong> ${device.id}</p>
      <p><strong>Name:</strong> ${device.name}</p>
      <p><strong>Room:</strong> ${device.room}</p>
      <p><strong>Status:</strong> 
        <span class="inline-block px-3 py-1 rounded-full ${statusClass} ${textColor} text-sm font-semibold">
          ${device.status}
        </span>
      </p>
      <p><strong>Remarks:</strong> ${device.remarks ? device.remarks : "<em>No remarks</em>"}</p>
      <div class="mt-2 flex gap-3">
        <svg data-action="edit" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 cursor-pointer hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 11l6-6m2 2L9 17H3v-6l10-10z" />
        </svg>
        <svg data-action="delete" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 cursor-pointer hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-3 0V4" />
        </svg>
      </div>
    `;

    container.appendChild(div);
  });
}

function deviceContainerClickHandler(event) {
  const action = event.target.closest("svg")?.dataset.action;
  if (!action) return;

  const deviceDiv = event.target.closest("div[data-device-index]");
  if (!deviceDiv) return;

  const index = parseInt(deviceDiv.dataset.deviceIndex, 10);
  if (action === "edit") {
    editDevice(index);
  } else if (action === "delete") {
    deleteDevice(index);
  }
}

function editDevice(index) {
  const device = devices[index];
  document.getElementById("editDeviceId").value = device.id;
  document.getElementById("editDeviceName").value = device.name;
  document.getElementById("editRoomAssigned").value = device.room;
  document.getElementById("editDeviceStatus").value = device.status;
  document.getElementById("editDeviceRemarks").value = device.remarks || "";

  editingIndex = index;
  document.getElementById("editModal").classList.remove("hidden");
}

function saveEditedDevice() {
  const name = document.getElementById("editDeviceName").value.trim();
  const room = document.getElementById("editRoomAssigned").value.trim();
  const status = document.getElementById("editDeviceStatus").value;
  const remarks = document.getElementById("editDeviceRemarks").value.trim();

  if (!name || !room || !status) {
    alert("Please fill in all fields.");
    return;
  }

  if (editingIndex !== -1) {
    devices[editingIndex].name = name;
    devices[editingIndex].room = room;
    devices[editingIndex].status = status;
    devices[editingIndex].remarks = remarks;
    updateDeviceList();
    showNotification("Device updated!");
    editingIndex = -1;
    closeEditModal();
  }
}

function deleteDevice(index) {
  if (confirm("Are you sure you want to delete this device?")) {
    devices.splice(index, 1);
    updateDeviceList();
    showNotification("Device deleted!");
  }
}

function filterDevices() {
  updateDeviceList();
}

function closeEditModal() {
  editingIndex = -1;
  document.getElementById("editModal").classList.add("hidden");
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.classList.remove("hidden");

  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = message;

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}

function clearAddForm() {
  document.getElementById("deviceId").value = "";
  document.getElementById("deviceName").value = "";
  document.getElementById("roomAssigned").value = "";
  document.getElementById("deviceStatus").value = "Online";
  document.getElementById("deviceRemarks").value = "";
  document.getElementById("statusFilter").value = "All";
}

function goToDashboard() {
  window.location.href = "admin_dashboard.html";
}

function signOut() {
  if (confirm("Are you sure you want to sign out?")) {
    window.location.href = "LoginPage.html";
  }
}
