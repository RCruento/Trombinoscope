(async () => {
<<<<<<< HEAD
    try {

        const data = await d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xEKGlgo2wX4qD2Y5WNNKUFfvGcbhmSelXz-80HAsuFsri6AFf71m09TRgAOQcHr0yk_09shV1Jd7/pub?output=csv");
        
        if (data) {
            const personCardsDiv = document.getElementById("personCards");
            data.forEach((row) => {
                const nom = row.Nom;
                const prenom = row.Prénom;
                const imageUrl= row.Image;
=======
    //Lecture des données du fichier CSV
     try {
        //a tester le nouveau lien
    const target = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xEKGlgo2wX4qD2Y5WNNKUFfvGcbhmSelXz-80HAsuFsri6AFf71m09TRgAOQcHr0yk_09shV1Jd7/pub?output=csv`;
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
>>>>>>> 308d586af2b21f4689873c08db3c4222e84a610d
                const imageUrl2 = imageUrl.split("id=")[1];
                const personCard = document.createElement("div");
                personCard.className="persson-card";
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
                //extravertie
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
            });
            
        } else {
            console.log(`Erreur de requête ${res.status}`);
        }
    } catch (err) {
        console.log(err);
    }
})();

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