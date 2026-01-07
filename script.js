// Get elements
const form = document.getElementById("placement-form");
const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const statusInput = document.getElementById("status");
const tableBody = document.getElementById("placement-table-body");

// Load data on page load
document.addEventListener("DOMContentLoaded", loadPlacements);

// Add placement
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const placement = {
    company: companyInput.value,
    role: roleInput.value,
    status: statusInput.value
  };

  savePlacement(placement);
  addPlacementToTable(placement);
  form.reset();
});

// Save to localStorage
function savePlacement(placement) {
  let placements = getPlacements();
  placements.push(placement);
  localStorage.setItem("placements", JSON.stringify(placements));
}

// Get from localStorage
function getPlacements() {
  return localStorage.getItem("placements")
    ? JSON.parse(localStorage.getItem("placements"))
    : [];
}

// Load placements on refresh
function loadPlacements() {
  const placements = getPlacements();
  placements.forEach(addPlacementToTable);
}

// Add row to table
function addPlacementToTable(placement) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${placement.company}</td>
    <td>${placement.role}</td>
    <td>${placement.status}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  row.querySelector(".delete-btn").addEventListener("click", function () {
    row.remove();
    deletePlacement(placement);
  });

  tableBody.appendChild(row);
}

// Delete placement
function deletePlacement(placementToDelete) {
  let placements = getPlacements();
  placements = placements.filter(
    p =>
      p.company !== placementToDelete.company ||
      p.role !== placementToDelete.role
  );
  localStorage.setItem("placements", JSON.stringify(placements));
}

