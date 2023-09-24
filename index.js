(async () => {
    try {
        const target = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQdn49-XGvDud06_FKhgjJuIvFE45gau18_RNRaL-xB4VwWREB6getYmivVVHT-EhNlO8KP2Q9QKz7_/pub?output=csv`;
        const res = await fetch(target, {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
            }
        });
        //Extraction des données du CSV
        if (res.status === 200) {
            const data = await res.text();
            const rows = data.split("\n");
            const personCardsDiv = document.getElementById("personCards");
            const searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("input", () => {
                const searchValue = searchInput.value.toLowerCase();
                personCardsDiv.innerHTML = "<h2>Personnes :</h2>"; 
                for (let i = 1; i < rows.length; i++) {
                    const cells = rows[i].split(",");
                    if (cells.length > 0) {
                        const name = cells[1].toLowerCase();
                        const surname = cells[2].toLowerCase();
                        if (name.includes(searchValue) || surname.includes(searchValue)) {
                            const imageUrl = cells[3];
                            const personCard = document.createElement("div");
                            personCard.className = "person-card";
                            const profilePicElement = document.createElement("img");
                            profilePicElement.src = imageUrl;
                            profilePicElement.alt = "Photo de profil";
                            const infoDiv = document.createElement("div");
                            infoDiv.className = "info";
                            const nameElement = document.createElement("h3");
                            nameElement.innerText = `${name} ${surname}`;
                            personCard.appendChild(profilePicElement);
                            infoDiv.appendChild(nameElement);
                            personCard.appendChild(infoDiv);
                            const extravertiData = cells.slice(4, 9);
                            const stresseData = cells.slice(9, 14);
                            const relationnelData = cells.slice(14, 19);
                            personCardsDiv.appendChild(personCard);
                            const chartContainer = document.createElement("div");
                            chartContainer.className = "chart-container";
                            //Clacule % de chaque tableau
                            const extravertiTotal = extravertiData.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                            const stresseTotal = stresseData.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                            const relationnelTotal = relationnelData.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                            const extravertiPercentage = (extravertiTotal / (extravertiData.length * 4)) * 100;
                            const stressePercentage = (stresseTotal / (stresseData.length * 4)) * 100;
                            const relationnelPercentage = (relationnelTotal / (relationnelData.length * 4)) * 100;
                            //Calule du reste %
                            const extravertiChart = createPieChart(extravertiPercentage, 100 - extravertiPercentage, "Extraverti", "Introverti", "green", "lightgray");
                            chartContainer.appendChild(extravertiChart);
                            const stresseChart = createPieChart(stressePercentage, 100 - stressePercentage, "Calme", "Stressé", "blue", "lightgray");
                            chartContainer.appendChild(stresseChart);
                            const relationnelChart = createPieChart(relationnelPercentage, 100 - relationnelPercentage, "Rationnel", "Emotionnel", "red", "lightgray");
                            chartContainer.appendChild(relationnelChart);
                            personCard.appendChild(chartContainer);
                        }
                    }
                }
            });
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].split(",");
                if (cells.length > 0) {
                    const name = cells[1];
                    const surname = cells[2];
                    const imageUrl = cells[3];
                    const imageUrl2 = imageUrl.split("id=")[1];
                    const personCard = document.createElement("div");
                    personCard.className = "person-card";
                    const profilePicElement = document.createElement("img");
                    profilePicElement.src = " https://drive.google.com/uc?export=view&id="+imageUrl2;
                    profilePicElement.alt = "Photo de profil";
                    const infoDiv = document.createElement("div");
                    infoDiv.className = "info";
                    const nameElement = document.createElement("h3");
                    nameElement.innerText = `${name} ${surname}`;
                    personCard.appendChild(profilePicElement);
                    infoDiv.appendChild(nameElement);
                    personCard.appendChild(infoDiv);
                    const extravertiData = cells.slice(4, 9);
                    const stresseData = cells.slice(9, 14);
                    const relationnelData = cells.slice(14, 19);
                    personCardsDiv.appendChild(personCard);
                    const chartContainer = document.createElement("div");
                    chartContainer.className = "chart-container";
                    const extravertiTotal = extravertiData.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                    const stresseTotal = stresseData.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                    const relationnelTotal = relationnelData.reduce((acc, value) => acc + (parseInt(value) - 1), 0);
                    const extravertiPercentage = (extravertiTotal / (extravertiData.length * 4)) * 100;
                    const stressePercentage = (stresseTotal / (stresseData.length * 4)) * 100;
                    const relationnelPercentage = (relationnelTotal / (relationnelData.length * 4)) * 100;
                    const extravertiChart = createPieChart(extravertiPercentage, 100 - extravertiPercentage, "Extraverti", "Introverti", "green", "lightgray");
                    chartContainer.appendChild(extravertiChart);
                    const stresseChart = createPieChart(stressePercentage, 100 - stressePercentage, "Calme", "Stressé", "blue", "lightgray");
                    chartContainer.appendChild(stresseChart);
                    const relationnelChart = createPieChart(relationnelPercentage, 100 - relationnelPercentage, "Rationnel", "Emotionnel", "red", "lightgray");
                    chartContainer.appendChild(relationnelChart);
                    personCard.appendChild(chartContainer);
                }
            }
        } else {
            console.log(`Code d'erreur ${res.status}`);
        }
    } catch (err) {
        console.log(err);
    }
})();

//Cration gaphieque des camemberts
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
