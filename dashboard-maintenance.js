const ticketTable = document.getElementById('ticketTable');
const notifCount = document.getElementById('notifCount');
let notifications = 0;

// Define valid buildings and room ranges
const buildingOptions = ['Building A', 'Building B', 'Building C'];
const roomOptions = [
  ...Array.from({ length: 10 }, (_, i) => `Room ${101 + i}`),
  ...Array.from({ length: 10 }, (_, i) => `Room ${201 + i}`),
  ...Array.from({ length: 10 }, (_, i) => `Room ${301 + i}`)
];

// Create Building Dropdown
function createBuildingDropdown() {
  const select = document.createElement('select');
  select.className = "bg-gray-700 text-white p-1 rounded w-full";
  buildingOptions.forEach(building => {
    const option = document.createElement('option');
    option.value = building;
    option.textContent = building;
    select.appendChild(option);
  });
  return select;
}

// Create Room Dropdown
function createRoomDropdown() {
  const select = document.createElement('select');
  select.className = "bg-gray-700 text-white p-1 rounded w-full";
  roomOptions.forEach(room => {
    const option = document.createElement('option');
    option.value = room;
    option.textContent = room;
    select.appendChild(option);
  });
  return select;
}

// Add Ticket Row
function addTicket() {
  const row = document.createElement('tr');
  row.setAttribute('data-status', 'Scheduled');
  row.innerHTML = `
    <td class="building-cell"></td>
    <td class="room-cell"></td>
    <td class="issue-cell" contenteditable>New issue</td>
    <td><input class="bg-gray-700 text-white p-1 rounded w-full" placeholder="Add note..." /></td>
    <td>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
    <td><span class="px-2 py-1 rounded status-scheduled">Scheduled</span></td>
    <td>
      <button class="bg-blue-500 px-2 py-1 rounded text-sm" onclick="nextStatus(this)">Update</button>
      <button class="bg-red-500 px-2 py-1 rounded text-sm ml-1" onclick="deleteRow(this)">Delete</button>
    </td>
  `;

  // Add Building dropdown
  const buildingDropdown = createBuildingDropdown();
  row.querySelector('.building-cell').appendChild(buildingDropdown);

  // Add Room dropdown
  const roomDropdown = createRoomDropdown();
  row.querySelector('.room-cell').appendChild(roomDropdown);

  ticketTable.appendChild(row);

  notifications++;
  notifCount.textContent = notifications;
  updateSummary();
}

// Update Status Logic
function nextStatus(button) {
  const row = button.closest('tr');
  const statusSpan = row.querySelector('td:nth-child(6) span'); // Status is now column 6
  const currentStatus = statusSpan.textContent.trim();
  let next = 'Scheduled';
  if (currentStatus === 'Scheduled') next = 'In Progress';
  else if (currentStatus === 'In Progress') next = 'Completed';
  else if (currentStatus === 'Completed') next = 'Scheduled';

  statusSpan.textContent = next;
  row.setAttribute('data-status', next);

  statusSpan.className = 'px-2 py-1 rounded ' +
    (next === 'Scheduled' ? 'status-scheduled' :
    next === 'In Progress' ? 'status-inprogress' : 'status-completed');

  updateSummary();
}

// Delete a Ticket
function deleteRow(button) {
  const row = button.closest('tr');
  row.remove();

  // Decrease notification count and update
  if (notifications > 0) {
    notifications--;
    notifCount.textContent = notifications;
  }

  updateSummary();
}


// Filter Tickets by Status
function filterTickets(status) {
  const rows = document.querySelectorAll('#ticketTable tr');
  rows.forEach(row => {
    const rowStatus = row.getAttribute('data-status');
    row.style.display = (rowStatus === status) ? '' : 'none';
  });
}

// Count & Update Summary
function updateSummary() {
  let scheduled = 0, inProgress = 0, completed = 0;
  document.querySelectorAll('#ticketTable tr').forEach(row => {
    const status = row.getAttribute('data-status');
    if (status === 'Scheduled') scheduled++;
    else if (status === 'In Progress') inProgress++;
    else if (status === 'Completed') completed++;
  });

  document.getElementById('countScheduled').textContent = scheduled;
  document.getElementById('countInProgress').textContent = inProgress;
  document.getElementById('countCompleted').textContent = completed;
}

// Add two default tickets on load (FOR TESTING)
//window.onload = () => {
//  addTicket();
//  addTicket();
//};
