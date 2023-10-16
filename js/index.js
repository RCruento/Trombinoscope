(async () => {
    try {
        const data = await d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xEKGlgo2wX4qD2Y5WNNKUFfvGcbhmSelXz-80HAsuFsri6AFf71m09TRgAOQcHr0yk_09shV1Jd7/pub?output=csv");
        if (data) {
            const personCardsDiv = document.getElementById("personCards");
            data.forEach((row) => {
                const nom = row.Nom;
                const prenom = row.Prénom;
                const imageUrl = row.Image;
                const imageUrl2 = imageUrl.split("id=")[1];
                const personCard = document.createElement("div");
                personCard.className = "person-card";
                const ImgProfile = document.createElement("img");
                ImgProfile.src = "https://drive.google.com/uc?export=view&id=" + imageUrl2;
                ImgProfile.alt = "Photo de profil";
                const infoDiv = document.createElement("div");
                infoDiv.className = "info";
                const nameElement = document.createElement("h3");
                nameElement.innerText = `${nom} ${prenom}`;
                personCard.appendChild(ImgProfile);
                infoDiv.appendChild(nameElement);
                personCard.appendChild(infoDiv);
                //extraverti
                const E1 = row.E1;
                const E2 = row.E2;
                const E3 = row.E3;
                const E4 = row.E4;
                const E5 = row.E5;
                //stresse
                const S1 = row.S1;
                const S2 = row.S2;
                const S3 = row.S3;
                const S4 = row.S4;
                const S5 = row.S5;
                //Emo
                const R1 = row.R1;
                const R2 = row.R2;
                const R3 = row.R3;
                const R4 = row.R4;
                const R5 = row.R5;
                //Tableau
                    //extra 
                const tabE = [E1, E2, E3, E4, E5];
                    //Stresse
                const tabS = [S1, S2, S3, S4, S5];
                    //Rela
                const tabR = [R1, R2, R3, R4, R5];
                const chartContainer = document.createElement("div");
                chartContainer.className = "chart-container";
                const extravertiTotal = tabE.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                const extravertiPercentage = (extravertiTotal / (tabE.length * 4)) * 100;
                const stresseTotal = tabS.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                const relationnelTotal = tabR.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                const stressePercentage = (stresseTotal / (tabS.length * 4)) * 100;
                const relationnelPercentage = (relationnelTotal / (tabR.length * 4)) * 100;
                const extravertiChart = createPieChart(extravertiPercentage, 100 - extravertiPercentage, "Extraverti", "Introverti", "green", "lightgray");
                chartContainer.appendChild(extravertiChart);
                const stresseChart = createPieChart(stressePercentage, 100 - stressePercentage, "Calme", "Stressé", "blue", "lightgray");
                chartContainer.appendChild(stresseChart);
                const relationnelChart = createPieChart(relationnelPercentage, 100 - relationnelPercentage, "Rationnel", "Emotionnel", "red", "lightgray");
                chartContainer.appendChild(relationnelChart);
                personCard.appendChild(chartContainer);
                personCardsDiv.appendChild(personCard);
            });
        } else {
            console.log(`Erreur de requête ${res.status}`);
        }
    } catch (err) {
        console.log(err);
    }
})();
const filterButton = document.getElementById("filterButton");
const filterSection = document.getElementById("filterSection");

filterButton.addEventListener("click", () => {
  if (filterSection.style.display === "none") {
    filterSection.style.display = "block";
    filterButton.textContent = "Masquer les filtres";
  } else {
    filterSection.style.display = "none";
    filterButton.textContent = "Afficher les filtres";
  }
});

//Les fonctions FILTRES
function filterByExtraverted() {
            const personCardsDiv = document.getElementById("personCards");
            const personCards = personCardsDiv.getElementsByClassName("person-card");

            for (let i = 0; i < personCards.length; i++) {
                const extravertiChart = personCards[i].querySelector(".chart-container svg:nth-child(1)");
                const extravertiPercentage = parseFloat(extravertiChart.textContent.split(":")[1]);

                if (extravertiPercentage <= 50) {
                    personCards[i].style.display = "none";
                } else {
                    personCards[i].style.display = "block";
                }
            }
        }

function filterByCalm() {
            const personCardsDiv = document.getElementById("personCards");
            const personCards = personCardsDiv.getElementsByClassName("person-card");

            for (let i = 0; i < personCards.length; i++) {
                const stresseChart = personCards[i].querySelector(".chart-container svg:nth-child(2)");
                const stressePercentage = parseFloat(stresseChart.textContent.split(":")[1]);

                if (stressePercentage <= 50) {
                    personCards[i].style.display = "none";
                } else {
                    personCards[i].style.display = "block";
                }
            }
        }

function filterByRationnel() {
            const personCardsDiv = document.getElementById("personCards");
            const personCards = personCardsDiv.getElementsByClassName("person-card");

            for (let i = 0; i < personCards.length; i++) {
                const relationnelChart = personCards[i].querySelector(".chart-container svg:nth-child(3)");
                const relationnelPercentage = parseFloat(relationnelChart.textContent.split(":")[1]);

                if (relationnelPercentage <= 50) {
                    personCards[i].style.display = "none";
                } else {
                    personCards[i].style.display = "block";
                }
            }
        }


//Fonction D3
function createPieChart(percentage, percentageRemaining, namePercentage, nameRemaining, colorPercentage, colorRemaining) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "chart");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "200");
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", "translate(100,100)");
    const percentageArc = d3.arc()
        .innerRadius(0)
        .outerRadius(80)
        .startAngle(0)
        .endAngle((percentage / 100) * 2 * Math.PI);
    const remainingArc = d3.arc()
        .innerRadius(0)
        .outerRadius(80)
        .startAngle((percentage / 100) * 2 * Math.PI)
        .endAngle(2 * Math.PI);
    const percentagePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    percentagePath.setAttribute("d", percentageArc());
    percentagePath.setAttribute("fill", colorPercentage);
    const remainingPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    remainingPath.setAttribute("d", remainingArc());
    remainingPath.setAttribute("fill", colorRemaining);
    const textPercentage = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textPercentage.setAttribute("transform", `translate(${percentageArc.centroid()})`);
    textPercentage.setAttribute("text-anchor", "middle");
    textPercentage.setAttribute("font-size", "14px");
    textPercentage.textContent = `${namePercentage}: ${percentage.toFixed(2)}%`;
    const textRemaining = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textRemaining.setAttribute("transform", `translate(${remainingArc.centroid()})`);
    textRemaining.setAttribute("text-anchor", "middle");
    textRemaining.setAttribute("font-size", "14px");
    textRemaining.textContent = `${nameRemaining}: ${percentageRemaining.toFixed(2)}%`;
    g.appendChild(percentagePath);
    g.appendChild(remainingPath);
    g.appendChild(textPercentage);
    g.appendChild(textRemaining);
    svg.appendChild(g);
    return svg;
}