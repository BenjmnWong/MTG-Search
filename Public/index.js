let hist = [];
let cardData = null;

async function fetchCard() {
    const cardName = document.getElementById("cardName").value;
    const cardDisplay = document.getElementById("cardDisplay");
    cardDisplay.innerHTML = "";

    try {
        const response = await fetch(`http://localhost:3000/api/card?name=${encodeURIComponent(cardName)}`);
        if (!response.ok) throw new Error("Card not found");

        cardData = await response.json();
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
        
        addToHist(cardData);
        
        cardElement.addEventListener("click", function() {
            const name = cardData.name;
            const formattedName = name.toLowerCase().replace(/\s+/g, '-');
            const set = cardData.set;
            const collectorNum = cardData.collector_number;
            const url = `https://scryfall.com/card/${set}/${collectorNum}/${formattedName}`;
            window.open(url, "_blank");
        });

    } catch (error) {
        cardDisplay.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}


function addToHist(cardData) {
    hist.unshift(cardData.name);  
    let newItem = document.createElement("li");
    newItem.className = "histItem";
    newItem.textContent = hist[0];

    newItem.addEventListener("click", function() {
        const name = cardData.name;
            const formattedName = name.toLowerCase().replace(/\s+/g, '-');
            const set = cardData.set;
            const collectorNum = cardData.collector_number;
            const url = `https://scryfall.com/card/${set}/${collectorNum}/${formattedName}`;
            window.open(url, "_blank");
    });

    document.getElementById("histList").insertBefore(newItem, document.getElementById("histList").firstChild);


}

const button = document.getElementById("search")
const inputField = document.getElementById("cardName");
inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        button.click();
    }
});
