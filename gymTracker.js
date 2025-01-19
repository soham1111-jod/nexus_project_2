const gymData = {
    gymTime: 30, // in minutes
    weekSchedule: [
        { day: "Sunday", workout: "Legs + Triceps", status: "Not Completed" },
        { day: "Monday", workout: "Rest", status: "Not Completed" },
        { day: "Tuesday", workout: "Chest + Shoulders", status: "Not Completed" },
        { day: "Wednesday", workout: "Back + Biceps", status: "Not Completed" },
        { day: "Thursday", workout: "Forearms + Abs", status: "Not Completed" },
        { day: "Friday", workout: "Legs + Triceps", status: "Not Completed" },
        { day: "Saturday", workout: "Chest + Shoulders", status: "Not Completed" }
    ]
};

// Function to calculate completed tasks
function calculateCompletedTasks() {
    return gymData.weekSchedule.filter(day => day.status === "Completed").length;
}

// Function to update the gym overview
function updateGymOverview() {
    const tasksCompleted = calculateCompletedTasks();
    const totalTasks = gymData.weekSchedule.length;
    const progressPercentage = Math.round((tasksCompleted / totalTasks) * 100);

    const overviewContainer = document.querySelector("#overview");
    overviewContainer.innerHTML = `
        <h3 class="font-bold text-gray-700 dark:text-gray-300">Today's Overview</h3>
        <p class="mt-2 text-gray-600 dark:text-gray-400">✅ Tasks Completed: ${tasksCompleted}/${totalTasks}</p>
        <p class="text-gray-600 dark:text-gray-400">🏋️‍♂️ Gym: ${gymData.gymTime} mins done</p>
        <p class="text-gray-600 dark:text-gray-400">💪 Progress: ${progressPercentage}%</p>
    `;
    updateProgressBar(progressPercentage);
}

// Function to update the progress bar
function updateProgressBar(progressPercentage) {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `Progress: ${progressPercentage}%`;
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle.checked) {
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
    }
}

// Function to render the weekly schedule
function renderWeeklySchedule() {
    const scheduleContainer = document.getElementById("workout-cards");
    scheduleContainer.innerHTML = ""; // Clear previous content

    gymData.weekSchedule.forEach(day => {
        const card = document.createElement("div");
        card.classList.add("p-4", "bg-gray-100", "dark:bg-gray-700", "rounded-lg", "shadow-md", "space-y-4");

        const dayTitle = document.createElement("h3");
        dayTitle.classList.add("text-xl", "font-semibold", "text-gray-800", "dark:text-gray-100");
        dayTitle.textContent = day.day;

        const workoutDetails = document.createElement("p");
        workoutDetails.classList.add("text-gray-600", "dark:text-gray-400");
        workoutDetails.textContent = day.workout;

        const statusButton = document.createElement("button");
        statusButton.classList.add("w-full", "py-2", "bg-blue-500", "text-white", "rounded-lg", "hover:bg-blue-600");
        statusButton.textContent = day.status === "Completed" ? "Completed" : "Mark as Completed";

        statusButton.onclick = function() {
            // Toggle status
            day.status = day.status === "Not Completed" ? "Completed" : "Not Completed";

            // Re-render the schedule and update the overview & progress bar
            renderWeeklySchedule();
            updateGymOverview();
        };

        card.appendChild(dayTitle);
        card.appendChild(workoutDetails);
        card.appendChild(statusButton);
        scheduleContainer.appendChild(card);
    });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    updateGymOverview();
    renderWeeklySchedule();

    // Listen for dark mode toggle change
    document.getElementById("dark-mode-toggle").addEventListener("change", toggleDarkMode);
});
