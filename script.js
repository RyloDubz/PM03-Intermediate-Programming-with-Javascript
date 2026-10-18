// Form elements
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const department = document.getElementById("department");
const email = document.getElementById("email");
const issueCategory = document.getElementById("issueCategory");
const message = document.getElementById("message");
const formMessage = document.getElementById("formMessage");

// Dynamic issue elements
const additionalIssue = document.getElementById("additionalIssue");
const addIssueButton = document.getElementById("addIssueButton");
const issueList = document.getElementById("issueList");

// Message counter
const messageCount = document.getElementById("messageCount");

// Department message
const departmentMessage = document.getElementById("departmentMessage");

// API elements
const loadApiButton = document.getElementById("loadApiButton");
const apiStatus = document.getElementById("apiStatus");
const apiData = document.getElementById("apiData");


// Message character counter
message.addEventListener("input", function() {
    messageCount.textContent = message.value.length + " / 500 characters";
});


// Department change event
department.addEventListener("change", function() {

    if (department.value === "IT") {
        departmentMessage.textContent = "IT department selected.";
    } else if (department.value === "HR") {
        departmentMessage.textContent = "HR department selected.";
    } else if (department.value === "Finance") {
        departmentMessage.textContent = "Finance department selected.";
    } else if (department.value === "Sales") {
        departmentMessage.textContent = "Sales department selected.";
    } else {
        departmentMessage.textContent = "";
    }

});


// Add additional issue
addIssueButton.addEventListener("click", function() {

    const issueText = additionalIssue.value.trim();

    if (issueText === "") {
        return;
    }

    const listItem = document.createElement("li");
    listItem.className = "issue-item";

    listItem.textContent = issueText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.type = "button";
    removeButton.className = "remove-button";

    removeButton.addEventListener("click", function() {
        listItem.remove();
    });

    listItem.appendChild(removeButton);
    issueList.appendChild(listItem);

    additionalIssue.value = "";

});


// Form submission
contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!contactForm.checkValidity()) {
        formMessage.textContent = "Please complete all required fields correctly.";
        return;
    }

    formMessage.textContent = "Form submitted successfully.";

});


// API data
loadApiButton.addEventListener("click", function() {

    apiStatus.textContent = "Loading data...";
    apiData.textContent = "";

    // Simulated JSON response for assessment testing
    const apiResponse = JSON.stringify({
        id: 2,
        name: "Ryan Wil",
        username: "Rylo",
        email: "rylodubz@gmail.com"
    });

    Promise.resolve(apiResponse)
        .then(function(response) {
            return JSON.parse(response);
        })
        .then(function(data) {

            apiStatus.textContent = "Data loaded successfully.";

            apiData.innerHTML = `
                <div class="api-item"><strong>User ID:</strong> ${data.id}</div>
                <div class="api-item"><strong>Name:</strong> ${data.name}</div>
                <div class="api-item"><strong>Username:</strong> ${data.username}</div>
                <div class="api-item"><strong>Email:</strong> ${data.email}</div>
            `;

        })
        .catch(function(error) {

            apiStatus.textContent = "Unable to load API data.";
            apiData.textContent = "An error occurred while retrieving the data.";

        });

});