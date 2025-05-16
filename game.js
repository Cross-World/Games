let pampeliskaCount = 0;
let farmCount = 0;
let forestCount = 0;
let treeCount = 0;
let quarryCount = 0;
let stoneCount = 0;
let coalCount = 0;
let coalProgress = 0;

// Viditelnost a stavy
let buyFarmVisible = false;
let buyForestVisible = false;
let buyQuarryVisible = false;
let showTreeCount = false;
let showUpgrades = false;
let researchFirePurchased = false;
let showResearchSection = false;

// Vylepšení
let upgrade1Purchased = false;
let upgrade2Purchased = false;
let upgrade3Purchased = false;
let productionMultiplier = 1;

// Elementy
const pampeliskaCountElem = document.getElementById('pampeliskaCount');
const farmCountElem = document.getElementById('farmCount');
const forestCountElem = document.getElementById('forestCount');
const treeCountElem = document.getElementById('treeCount');
const quarryCountElem = document.getElementById('quarryCount');
const stoneCountElem = document.getElementById('stoneCount');
const coalCountElem = document.getElementById('coalCount');
const clickButton = document.getElementById('clickButton');
const buyFarmButton = document.getElementById('buyFarmButton');
const buyForestButton = document.getElementById('buyForestButton');
const buyQuarryButton = document.getElementById('buyQuarryButton');
const treeCounterDiv = document.getElementById('treeCounter');
const forestRowDiv = document.getElementById('forestRow');
const quarryRowDiv = document.getElementById('quarryRow');
const stoneCounterDiv = document.getElementById('stoneCounter');
const coalCounterDiv = document.getElementById('coalCounter');
const upgradesSection = document.getElementById('upgradesSection');
const upgrade1Elem = document.getElementById('upgrade1');
const upgrade2Elem = document.getElementById('upgrade2');
const upgrade3Elem = document.getElementById('upgrade3');
const matrixBtn = document.getElementById('matrixBtn');
const researchSection = document.getElementById('researchSection');
const researchFireElem = document.getElementById('researchFire');

// Chyba v matrixu: +100 ke všem produktům
matrixBtn.addEventListener('click', () => {
    pampeliskaCount += 100;
    treeCount += 100;
    stoneCount += 100;
    updateUI();
});

// Sběr pampelišky klikem
clickButton.addEventListener('click', () => {
    pampeliskaCount++;
    updateUI();
});

// Koupě farmy
buyFarmButton.addEventListener('click', () => {
    if (pampeliskaCount >= 10) {
        pampeliskaCount -= 10;
        farmCount++;
        updateUI();
    }
});

// Koupě lesa
buyForestButton.addEventListener('click', () => {
    if (pampeliskaCount >= 100) {
        pampeliskaCount -= 100;
        forestCount++;
        updateUI();
    }
});

// Koupě lomu
buyQuarryButton.addEventListener('click', () => {
    if (treeCount >= 100) {
        treeCount -= 100;
        quarryCount++;
        updateUI();
    }
});

// Vylepšení 1 - 2x produkce pampelišek (50 stromů)
upgrade1Elem.addEventListener('click', () => {
    if (treeCount >= 50 && !upgrade1Purchased) {
        treeCount -= 50;
        upgrade1Purchased = true;
        productionMultiplier *= 2;
        upgrade1Elem.textContent = "2x produkce pampelišek";
        upgrade1Elem.classList.add('purchased');
        updateUI();
    }
});

// Vylepšení 2 - 2x produkce pampelišek (500 stromů + 500 pampelišek)
upgrade2Elem.addEventListener('click', () => {
    if (treeCount >= 500 && pampeliskaCount >= 500 && !upgrade2Purchased) {
        treeCount -= 500;
        pampeliskaCount -= 500;
        upgrade2Purchased = true;
        productionMultiplier *= 2;
        upgrade2Elem.textContent = "2x produkce pampelišek";
        upgrade2Elem.classList.add('purchased');
        updateUI();
    }
});

// Vylepšení 3 - 2x produkce pampelišek (500 kamenů, 1000 stromů, 5000 pampelišek)
if (upgrade3Elem) {
    upgrade3Elem.addEventListener('click', () => {
        if (
            stoneCount >= 500 &&
            treeCount >= 1000 &&
            pampeliskaCount >= 5000 &&
            !upgrade3Purchased
        ) {
            stoneCount -= 500;
            treeCount -= 1000;
            pampeliskaCount -= 5000;
            upgrade3Purchased = true;
            productionMultiplier *= 2;
            upgrade3Elem.textContent = "2x produkce pampelišek";
            upgrade3Elem.classList.add('purchased');
            updateUI();
        }
    });
}

// Výzkum Oheň
researchFireElem.addEventListener('click', () => {
    if (
        pampeliskaCount >= 10 &&
        treeCount >= 10 &&
        stoneCount >= 10 &&
        !researchFirePurchased
    ) {
        pampeliskaCount -= 10;
        treeCount -= 10;
        stoneCount -= 10;
        researchFirePurchased = true;
        updateUI();
    }
});

// Produkce každou sekundu
setInterval(() => {
    pampeliskaCount += (farmCount * 0.1) * productionMultiplier;

    // Produkce stromů
    if (forestCount > 0) {
        const deltaTrees = forestCount * 0.1;
        treeCount += deltaTrees;

        // Produkce uhlí (pouze pokud je odemčený výzkum Oheň)
        if (researchFirePurchased) {
            coalProgress += deltaTrees / 10; // 1 uhlí za každých 10 stromů
            if (coalProgress >= 1) {
                const wholeCoal = Math.floor(coalProgress);
                coalCount += wholeCoal;
                coalProgress -= wholeCoal;
            }
        }
    }

    if (quarryCount > 0) stoneCount += quarryCount * 0.1;
    updateUI();
}, 1000);

// Aktualizace UI
function updateUI() {
    pampeliskaCountElem.textContent = Math.floor(pampeliskaCount);
    farmCountElem.textContent = farmCount;
    forestCountElem.textContent = forestCount;
    quarryCountElem.textContent = quarryCount;
    treeCountElem.textContent = Math.floor(treeCount);
    stoneCountElem.textContent = Math.floor(stoneCount);

    // Zobrazení tlačítek
    buyFarmButton.style.display = (pampeliskaCount >= 10 || farmCount > 0) ? 'inline' : 'none';
    buyForestButton.style.display = (pampeliskaCount >= 100 || forestCount > 0) ? 'inline' : 'none';
    buyQuarryButton.style.display = (treeCount >= 100 || quarryCount > 0) ? 'inline' : 'none';

    // Zobrazení sekcí
    forestRowDiv.style.display = (pampeliskaCount >= 100 || forestCount > 0) ? 'flex' : 'none';
    quarryRowDiv.style.display = (treeCount >= 100 || quarryCount > 0) ? 'flex' : 'none';
    treeCounterDiv.style.display = (forestCount > 0 || treeCount > 0) ? 'flex' : 'none';
    stoneCounterDiv.style.display = (quarryCount > 0 || stoneCount > 0) ? 'flex' : 'none';

    // Uhlí - pouze pokud je Oheň
    if (researchFirePurchased) {
        coalCounterDiv.style.display = 'flex';
        coalCountElem.textContent = Math.floor(coalCount);
    } else {
        coalCounterDiv.style.display = 'none';
    }

    // Vylepšení
    upgradesSection.style.display = (treeCount >= 50 || upgrade1Purchased) ? 'block' : 'none';

    // Upgrade 1
    if (!upgrade1Purchased) {
        upgrade1Elem.style.cursor = treeCount >= 50 ? 'pointer' : 'default';
        upgrade1Elem.style.opacity = treeCount >= 50 ? '1' : '0.5';
        upgrade1Elem.title = "Cena: 50 stromů";
        upgrade1Elem.classList.remove('purchased');
    } else {
        upgrade1Elem.classList.add('purchased');
        upgrade1Elem.title = "";
    }

    // Upgrade 2
    if (!upgrade2Purchased) {
        upgrade2Elem.style.cursor = (treeCount >= 500 && pampeliskaCount >= 500) ? 'pointer' : 'default';
        upgrade2Elem.style.opacity = (treeCount >= 500 && pampeliskaCount >= 500) ? '1' : '0.5';
        upgrade2Elem.title = "Cena: 500 stromů + 500 pampelišek";
        upgrade2Elem.classList.remove('purchased');
    } else {
        upgrade2Elem.classList.add('purchased');
        upgrade2Elem.title = "";
    }

    // Upgrade 3
    if (typeof upgrade3Elem !== "undefined") {
        if (!upgrade3Purchased) {
            upgrade3Elem.style.cursor =
                (stoneCount >= 500 && treeCount >= 1000 && pampeliskaCount >= 5000) ? 'pointer' : 'default';
            upgrade3Elem.style.opacity =
                (stoneCount >= 500 && treeCount >= 1000 && pampeliskaCount >= 5000) ? '1' : '0.5';
            upgrade3Elem.title = "Cena: 500 kamenů, 1000 stromů, 5000 pampelišek";
            upgrade3Elem.classList.remove('purchased');
        } else {
            upgrade3Elem.classList.add('purchased');
            upgrade3Elem.title = "";
        }
    }

    // Výzkum - zobrazit až při splnění podmínky nebo po zakoupení
    if ((pampeliskaCount >= 10 && treeCount >= 10 && stoneCount >= 10) || researchFirePurchased) {
        researchSection.style.display = 'block';
    } else {
        researchSection.style.display = 'none';
    }

    // Výzkum "Oheň" - tooltip pouze pokud není zakoupen
    if (!researchFirePurchased) {
        researchFireElem.style.cursor = (pampeliskaCount >= 10 && treeCount >= 10 && stoneCount >= 10) ? 'pointer' : 'default';
        researchFireElem.style.opacity = (pampeliskaCount >= 10 && treeCount >= 10 && stoneCount >= 10) ? '1' : '0.5';
        researchFireElem.title = "Cena: 10 pampelišek, 10 stromů, 10 kamene";
        researchFireElem.classList.remove('purchased');
    } else {
        researchFireElem.classList.add('purchased');
        researchFireElem.title = "";
    }
}

// První vykreslení
updateUI();
