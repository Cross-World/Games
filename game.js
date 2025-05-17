// ... (ostatní proměnné a kód zůstávají stejné)

const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');

// Ukládání hry
function saveGame() {
    const gameState = {
        pampeliskaCount,
        farmCount,
        forestCount,
        treeCount,
        quarryCount,
        stoneCount,
        coalCount,
        coalProgress,
        researchFirePurchased,
        upgrade1Purchased,
        upgrade2Purchased,
        upgrade3Purchased,
        productionMultiplier
    };
    localStorage.setItem('gameSave', JSON.stringify(gameState));
    alert("Hra byla uložena!");
}

// Načtení hry
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('gameSave'));
    if (savedGame) {
        pampeliskaCount = savedGame.pampeliskaCount ?? 0;
        farmCount = savedGame.farmCount ?? 0;
        forestCount = savedGame.forestCount ?? 0;
        treeCount = savedGame.treeCount ?? 0;
        quarryCount = savedGame.quarryCount ?? 0;
        stoneCount = savedGame.stoneCount ?? 0;
        coalCount = savedGame.coalCount ?? 0;
        coalProgress = savedGame.coalProgress ?? 0;
        researchFirePurchased = savedGame.researchFirePurchased ?? false;
        upgrade1Purchased = savedGame.upgrade1Purchased ?? false;
        upgrade2Purchased = savedGame.upgrade2Purchased ?? false;
        upgrade3Purchased = savedGame.upgrade3Purchased ?? false;
        productionMultiplier = savedGame.productionMultiplier ?? 1;
    }
}

// Reset hry
function resetGame() {
    if (confirm("Opravdu chceš vymazat a restartovat hru?")) {
        localStorage.removeItem('gameSave');
        // Nastav všechny proměnné na výchozí hodnoty:
        pampeliskaCount = 0;
        farmCount = 0;
        forestCount = 0;
        treeCount = 0;
        quarryCount = 0;
        stoneCount = 0;
        coalCount = 0;
        coalProgress = 0;
        researchFirePurchased = false;
        upgrade1Purchased = false;
        upgrade2Purchased = false;
        upgrade3Purchased = false;
        productionMultiplier = 1;
        updateUI();
    }
}

// Event listenery na tlačítka
if (saveBtn) saveBtn.addEventListener('click', saveGame);
if (resetBtn) resetBtn.addEventListener('click', resetGame);

// Při načtení stránky
window.onload = function() {
    loadGame();
    updateUI();
};

// Automatické ukládání každých 15 sekund
setInterval(saveGame, 15000);
