let hist = []


async function fetchCard() {
    const cardName = document.getElementById("cardName").value;
    const cardDisplay = document.getElementById("cardDisplay");
    cardDisplay.innerHTML = ""; // Clear previous result

    try {
        const response = await fetch(`http://localhost:3000/api/card?name=${encodeURIComponent(cardName)}`);
        if (!response.ok) throw new Error("Card not found");

        const cardData = await response.json();
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
            <h2>${cardData.name}</h2>
            <img src="${cardData.image_uris?.normal || cardData.card_faces[0]?.image_uris?.normal}" alt="${cardData.name}">
            <p><strong>Type:</strong> ${cardData.type_line}</p>
            <p><strong>Mana Cost:</strong> ${cardData.mana_cost || "N/A"}</p>
            <p><strong>Text:</strong> ${cardData.oracle_text || "No description"}</p>
        `;
        cardDisplay.appendChild(cardElement);
        hist.push(cardData.name);
        if (hist.length == 0) {
            createHistBar();
        }





    } catch (error) {
        cardDisplay.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}


function createHistBar () {

}

function addToHist() {
    let newItem = document.createElement("li");
    newItem.textContent = hist[hist.length];
    document.getElementById("histList").appendChild(newItem);
}