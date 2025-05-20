function signOut() {
  alert("Signing out...");
  window.location.href = "login.html";
}

function openCampusModal() {
  const modal = document.getElementById("campusModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Clear inputs when opening
  document.getElementById("campusName").value = "";
  document.getElementById("campusAddress").value = "";
}

function closeCampusModal() {
  const modal = document.getElementById("campusModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");

  // Optional: Clear fields when closing
  document.getElementById("campusName").value = "";
  document.getElementById("campusAddress").value = "";
}

function saveCampus() {
  const nameInput = document.getElementById("campusName");
  const addressInput = document.getElementById("campusAddress");

  const name = nameInput.value.trim();
  const address = addressInput.value.trim();

  if (!name || !address) {
    alert("Please fill in all fields.");
    return;
  }

  // Feedback or API saving logic can go here
  alert(`Campus "${name}" at "${address}" saved successfully.`);

  closeCampusModal();
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  const placeholder = document.getElementById("placeholderText");
  const image = document.getElementById("mapImage");

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
      image.classList.remove("hidden");
      placeholder.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please upload a valid image file (e.g., JPG, PNG).");
  }
}

function toggleCampusList() {
  const list = document.getElementById("campusList");
  list.classList.toggle("hidden");
}

function toggleBuildingList() {
  const list = document.getElementById("buildingList");
  list.classList.toggle("hidden");
}
