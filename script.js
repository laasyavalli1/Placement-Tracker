// Get elements
const form = document.getElementById("application-form");
const applicationsList = document.getElementById("applications-list");
const filterStatus = document.getElementById("filter-status");

// Load data on page load
document.addEventListener("DOMContentLoaded", loadApplications);

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const application = {
    company: document.getElementById("company").value,
    role: document.getElementById("role").value,
    status: document.getElementById("status").value,
    deadline: document.getElementById("deadline").value,
    notes: document.getElementById("notes").value
  };

  saveApplication(application);
  renderApplications();
  form.reset();
});

// Save to localStorage
function saveApplication(app) {
  const applications = getApplications();
  applications.push(app);
  localStorage.setItem("applications", JSON.stringify(applications));
}

// Get from localStorage
function getApplications() {
  return localStorage.getItem("applications")
    ? JSON.parse(localStorage.getItem("applications"))
    : [];
}

// Load all applications
function loadApplications() {
  renderApplications();
}

// Render applications
function renderApplications() {
  applicationsList.innerHTML = "";

  const applications = getApplications();
  const selectedStatus = filterStatus.value;

  const filteredApps =
    selectedStatus === "All"
      ? applications
      : applications.filter(app => app.status === selectedStatus);

  if (filteredApps.length === 0) {
    applicationsList.innerHTML =
      "<p>No placement applications added yet.</p>";
    return;
  }

  filteredApps.forEach((app, index) => {
    const card = document.createElement("div");
    card.className = "application-card";

    card.innerHTML = `
      <p><strong>Company:</strong> ${app.company}</p>
      <p><strong>Role:</strong> ${app.role}</p>
      <p>
        <strong>Status:</strong>
        <span class="status ${app.status.toLowerCase()}">
          ${app.status}
        </span>
      </p>
      ${app.deadline ? `<p><strong>Deadline:</strong> ${app.deadline}</p>` : ""}
      ${app.notes ? `<p><strong>Notes:</strong> ${app.notes}</p>` : ""}
      <button onclick="deleteApplication(${index})">Delete</button>
    `;

    applicationsList.appendChild(card);
  });
}

// Delete application
function deleteApplication(index) {
  const applications = getApplications();
  applications.splice(index, 1);
  localStorage.setItem("applications", JSON.stringify(applications));
  renderApplications();
}

// Filter change
filterStatus.addEventListener("change", renderApplications);
