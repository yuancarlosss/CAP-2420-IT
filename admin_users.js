const users = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addUserBtn").addEventListener("click", addUser);
  document.getElementById("signOutBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to sign out?")) window.location.href = "LoginPage.html";
  });

  renderUsers();
});

function addUser() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const role = document.getElementById("userRole").value;

  if (!name || !email || !role) {
    alert("Please fill in all fields.");
    return;
  }

  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    alert("User with this email already exists.");
    return;
  }

  users.push({ name, email, role });
  renderUsers();

  // Clear form
  document.getElementById("userName").value = "";
  document.getElementById("userEmail").value = "";
  document.getElementById("userRole").value = "";
}

function renderUsers() {
  const container = document.getElementById("userTable");
  container.innerHTML = "";

  if (users.length === 0) {
    container.innerHTML = "<p class='text-gray-500 italic'>No users found.</p>";
    return;
  }

  users.forEach((user, index) => {
    const div = document.createElement("div");
    div.className = "p-4 bg-gray-50 border rounded flex justify-between items-center";

    div.innerHTML = `
      <div>
        <p><strong>${user.name}</strong> (${user.email})</p>
        <p class="text-sm text-gray-600">Role: <span class="font-medium">${user.role}</span></p>
      </div>
      <div class="flex gap-2">
        <select class="p-1 border rounded" onchange="updateRole(${index}, this.value)">
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
          <option value="maintenance" ${user.role === "maintenance" ? "selected" : ""}>Maintenance</option>
          <option value="user" ${user.role === "user" ? "selected" : ""}>User</option>
        </select>
        <button class="text-red-600 hover:text-red-800" onclick="deleteUser(${index})">
          <i data-lucide="trash-2" class="w-5 h-5"></i>
        </button>
      </div>
    `;

    container.appendChild(div);
    lucide.createIcons();
  });
}

function updateRole(index, newRole) {
  users[index].role = newRole;
  renderUsers();
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    renderUsers();
  }
}
