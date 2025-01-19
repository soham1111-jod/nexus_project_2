const lectures = [
    {
        category: "Web Development",
        topics: [
            { id: 1, title: "Basics of Internet", totalLectures: 10, attendedLectures: 10 },
            { id: 2, title: "HTML", totalLectures: 11, attendedLectures: 11 },
            { id: 3, title: "CSS", totalLectures: 18, attendedLectures: 18 },
            { id: 4, title: "JavaScript", totalLectures: 32, attendedLectures: 32 },
            { id: 5, title: "Git and GitHub", totalLectures: 3, attendedLectures: 3 },
            { id: 6, title: "TypeScript", totalLectures: 3, attendedLectures: 3 },
            { id: 7, title: "React", totalLectures: 3, attendedLectures: 3 },
        ]
    },
    {
        category: "DSA",
        topics: [
            { id: 8, title: "Introduction to DSA", totalLectures: 10, attendedLectures: 10 },
            // Add more DSA topics here
        ]
    },
    {
        category: "Blockchain",
        topics: [
            { id: 9, title: "Introduction to Blockchain", totalLectures: 5, attendedLectures: 5 },
            // Add more Blockchain topics here
        ]
    }
];

function generateLectureCards() {
    const trackerContainer = document.querySelector("#tracker");
    trackerContainer.innerHTML = "";

    lectures.forEach(category => {
        const categorySection = document.createElement("section");
        categorySection.className = "mb-8";
        categorySection.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">${category.category}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${category.topics.map(topic => `
                    <div class="p-4 bg-white rounded-lg shadow hover:shadow-lg dark:bg-gray-800">
                        <h3 class="text-lg font-semibold dark:text-white">${topic.title}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Lectures: ${topic.attendedLectures}/${topic.totalLectures}</p>
                        <button class="mt-4 text-blue-500 hover:underline dark:text-blue-300" onclick="openLectureDetails(${topic.id})">
                            View Details
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        trackerContainer.appendChild(categorySection);
    });
}

function updateProgressBar() {
    const totalLectures = lectures.reduce((acc, category) => acc + category.topics.reduce((acc, topic) => acc + topic.totalLectures, 0), 0);
    const attendedLectures = lectures.reduce((acc, category) => acc + category.topics.reduce((acc, topic) => acc + topic.attendedLectures, 0), 0);
    const progress = (attendedLectures / totalLectures) * 100;
    document.querySelector("#progress-bar").style.width = `${progress}%`;
    document.querySelector("#progress-text").textContent = `Lecture Progress: ${attendedLectures}/${totalLectures}`;
}

function markAsMissed(id) {
    lectures.forEach(category => {
        const topic = category.topics.find(topic => topic.id === id);
        if (topic) {
            topic.attendedLectures--;
            topic.plan = prompt("Enter your plan to cover this missed lecture:");
        }
    });
    generateLectureCards();
    updateProgressBar();
    updateOverview();
}

function updateOverview() {
    const overviewContainer = document.querySelector("#overview");
    const totalLectures = lectures.reduce((acc, category) => acc + category.topics.reduce((acc, topic) => acc + topic.totalLectures, 0), 0);
    const attendedLectures = lectures.reduce((acc, category) => acc + category.topics.reduce((acc, topic) => acc + topic.attendedLectures, 0), 0);
    overviewContainer.innerHTML = `
        <h3 class="font-bold text-gray-700 dark:text-gray-300">Today's Overview</h3>
        <p class="text-gray-600 dark:text-gray-400">📚 Lectures Attended: ${attendedLectures}/${totalLectures}</p>
    `;
}

function toggleDarkMode() {
    const body = document.body;
    const toggle = document.getElementById("dark-mode-toggle");
    const icon = document.getElementById("dark-mode-icon");

    toggle.addEventListener("change", () => {
        body.classList.toggle("dark", toggle.checked);
        if (toggle.checked) {
            icon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            `;
        } else {
            icon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a8 8 0 00-8 8 8 8 0 0012.9 6.32 7 7 0 01-9.9-9.9A8 8 0 0010 2z" />
                </svg>
            `;
        }
    });
}

function addDailyLecture() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude weekends
        lectures.forEach(category => {
            category.topics.forEach(topic => {
                if (topic.attendedLectures < topic.totalLectures) {
                    topic.attendedLectures++;
                }
            });
        });
        generateLectureCards();
        updateProgressBar();
        updateOverview();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    generateLectureCards();
    updateProgressBar();
    updateOverview();
    toggleDarkMode();
    addDailyLecture();
});

function openLectureDetails(id) {
    const trackerContainer = document.querySelector("#tracker");
    trackerContainer.innerHTML = "";

    lectures.forEach(category => {
        category.topics.forEach(topic => {
            if (topic.id === id) {
                const topicSection = document.createElement("section");
                topicSection.className = "mb-8";
                topicSection.innerHTML = `
                    <h2 class="text-2xl font-bold mb-4">${topic.title}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${Array.from({ length: topic.totalLectures }, (_, i) => `
                            <div class="p-4 bg-white rounded-lg shadow hover:shadow-lg dark:bg-gray-800">
                                <h3 class="text-lg font-semibold dark:text-white">Lecture ${i + 1}</h3>
                                <button class="mt-4 text-green-500 hover:underline dark:text-green-300" onclick="markAsAttended(${topic.id}, ${i + 1})">
                                    Attended
                                </button>
                                <button class="mt-2 text-red-500 hover:underline dark:text-red-300" onclick="markAsMissed(${topic.id}, ${i + 1})">
                                    Missed
                                </button>
                            </div>
                        `).join('')}
                    </div>
                `;
                trackerContainer.appendChild(topicSection);
            }
        });
    });
}

function markAsAttended(topicId, lectureNumber) {
    lectures.forEach(category => {
        const topic = category.topics.find(topic => topic.id === topicId);
        if (topic && lectureNumber <= topic.totalLectures) {
            topic.attendedLectures = Math.max(topic.attendedLectures, lectureNumber);
        }
    });
    generateLectureCards();
    updateProgressBar();
    updateOverview();
}