const form = document.getElementById("visitForm");

if (form) {

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const visit = {

        restaurant:
            document.getElementById("restaurant").value,

        date:
            document.getElementById("visitDate").value,

        freshness:
            Number(document.getElementById("freshness").value),

        flavor:
            Number(document.getElementById("flavor").value),

        value:
            Number(document.getElementById("value").value),

        atmosphere:
            Number(document.getElementById("atmosphere").value),

        service:
            Number(document.getElementById("service").value),

        bestBite:
            document.getElementById("bestBite").value,

        notes:
            document.getElementById("notes").value
    };

    visit.score =
        Math.round(
            (
                visit.freshness +
                visit.flavor +
                visit.value +
                visit.atmosphere +
                visit.service
            ) / 50 * 100
        );

    let visits =
        JSON.parse(
            localStorage.getItem("sushiVisits")
        ) || [];

    visits.push(visit);

    localStorage.setItem(
        "sushiVisits",
        JSON.stringify(visits)
    );

    alert("Visit saved!");

    form.reset();
});


}
const passportGrid =
document.getElementById("passportGrid");

if (passportGrid) {

const restaurants = [
    "Basho",
    "Sushi Maki",
    "Ocean Sushi",
    "Sushi Island",
    "Sun Sushi",
    "O Sushi",
    "Kuma Bento",
    "Merchant Tavern",
    "Exile",
    "RJ Pinoy Yum"
];

const visits =
    JSON.parse(
        localStorage.getItem("sushiVisits")
    ) || [];

restaurants.forEach(name => {

    const visit =
        visits.find(
            v => v.restaurant === name
        );

    const stamp =
        document.createElement("div");

    stamp.className =
        visit
        ? "stamp completed"
        : "stamp pending";

    stamp.innerHTML = visit
        ? `
            <span class="stamp-date">
                ${visit.date}
            </span>
            <h3>${name}</h3>
            <p>${visit.score}/100</p>
          `
        : `
            <h3>${name}</h3>
            <p>Awaiting Visit</p>
          `;

    passportGrid.appendChild(stamp);

});

}
const existingIndex =
    visits.findIndex(
        v => v.restaurant === visit.restaurant
    );

if (existingIndex >= 0) {
    visits[existingIndex] = visit;
} else {
    visits.push(visit);
}