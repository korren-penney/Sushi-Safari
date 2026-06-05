/* =========================================================
   🍣 SUSHI SAFARI - DATA CORE
   Single source of truth for the whole site
========================================================= */

const STORAGE_KEY = "sushiVisits";

function getVisits() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveVisits(visits) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
}

/* =========================================================
   🍣 FORM HANDLER (LOG ENTRY PAGE)
========================================================= */

const form = document.getElementById("visitForm");

if (form) {

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const visit = {
            restaurant: document.getElementById("restaurant").value,
            date: document.getElementById("visitDate").value,
            freshness: Number(document.getElementById("freshness").value),
            flavor: Number(document.getElementById("flavor").value),
            value: Number(document.getElementById("value").value),
            atmosphere: Number(document.getElementById("atmosphere").value),
            service: Number(document.getElementById("service").value),
            bestBite: document.getElementById("bestBite").value,
            notes: document.getElementById("notes").value
        };

        // Overall score (simple average scaled to 100)
        visit.score = Math.round(
            (
                visit.freshness +
                visit.flavor +
                visit.value +
                visit.atmosphere +
                visit.service
            ) / 50 * 100
        );

        let visits = getVisits();

        // Prevent duplicate restaurant entries (overwrite instead of duplicate)
        const existingIndex = visits.findIndex(
            v => v.restaurant === visit.restaurant
        );

        if (existingIndex >= 0) {
            visits[existingIndex] = visit;
        } else {
            visits.push(visit);
        }

        saveVisits(visits);

        alert("🍣 Visit saved!");

        form.reset();
    });
}

/* =========================================================
   🍣 PASSPORT RENDERING
========================================================= */

const passportGrid = document.getElementById("passportGrid");

if (passportGrid) {

    const restaurants = [
        "Sushi Island",
        "Sun Sushi",
        "O Sushi",
        "Kuma Bento",
        "The Rock Steakhouse",
        "Sushi & Noodle Nami Express (Churchill Square)",
        "Moxies",
        "Grotto",
        "Green Mango",
        "Asian Cafe",
        "Basho",
        "Sushi Maki",
        "Ocean Sushi"
    ];

    const visits = getVisits();

    passportGrid.innerHTML = "";

    restaurants.forEach(name => {

        const visit = visits.find(v => v.restaurant === name);

        const stamp = document.createElement("div");

        stamp.className = visit ? "stamp completed" : "stamp pending";

        stamp.innerHTML = visit
            ? `
                <span class="stamp-date">${visit.date}</span>
                <h3>${name}</h3>
                <p>${visit.score}/100</p>
              `
            : `
                <h3>${name}</h3>
                <p>Awaiting Visit</p>
              `;

        passportGrid.appendChild(stamp);
    });
// ==========================================
    // 🚀 ADD THIS NEW PROGRESS BAR CODE HERE:
    // ==========================================
    const progressFill = document.querySelector(".passport-progress-fill");
    const progressText = document.querySelector(".passport-progress p");

    if (progressFill) {
        const totalRestaurants = restaurants.length;
        const visitedCount = visits.length;
        
        // Calculate percentage (clamped to 100% just in case)
        const percentage = totalRestaurants > 0 
            ? Math.min(Math.round((visitedCount / totalRestaurants) * 100), 100) 
            : 0;

        // Update the visual width and the text inside the bar
        progressFill.style.width = `${percentage}%`;
        progressFill.textContent = `${percentage}%`;

        // Update the descriptive text below the bar (e.g., "2 of 13 Restaurants Visited")
        if (progressText) {
            progressText.textContent = `${visitedCount} of ${totalRestaurants} Restaurants Visited`;
        }
    }
}

/* =========================================================
   🍣 LEADERBOARD RENDERING
========================================================= */

const leaderboardContainer = document.getElementById("leaderboardContainer");

if (leaderboardContainer) {

    const visits = getVisits();

    const sorted = [...visits].sort((a, b) => b.score - a.score);

    leaderboardContainer.innerHTML = "";

    if (sorted.length === 0) {
        leaderboardContainer.innerHTML = "<p>No visits yet 🍣</p>";
    }

    sorted.forEach((visit, index) => {

        const card = document.createElement("div");
        card.className = "leader-card";

        let medal = "";

        if (index === 0) medal = "🥇";
        else if (index === 1) medal = "🥈";
        else if (index === 2) medal = "🥉";
        else medal = `#${index + 1}`;

        card.innerHTML = `
            <h2>${medal}</h2>
            <h3>${visit.restaurant}</h3>
            <p>${visit.score}/100</p>
        `;

        leaderboardContainer.appendChild(card);
    });
}