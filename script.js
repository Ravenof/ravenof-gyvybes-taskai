let maxLifePoints = 40; // Default max life points

function setMode(points) {
    maxLifePoints = points;
    document.getElementById('player1-points').textContent = `${document.getElementById('player1-name-input').value}: ${points} ${getPointsLabel(points)}`;
    document.getElementById('player2-points').textContent = `${document.getElementById('player2-name-input').value}: ${points} ${getPointsLabel(points)}`;
    document.getElementById('player1-points').style.color = 'green';
    document.getElementById('player2-points').style.color = 'green';
}

function changePoints(player, change) {
    let pointsElement = document.getElementById(`${player}-points`);
    let points = parseInt(pointsElement.textContent.split(': ')[1]);
    points += change;
    if (points < 0) points = 0;
    if (points > maxLifePoints) points = maxLifePoints;

    // Atnaujiname taškų formuluotę priklausomai nuo kiekio
    pointsElement.textContent = `${document.getElementById(`${player}-name-input`).value}: ${points} ${getPointsLabel(points)}`;

    // Keičia spalvą į žalią, kai taškai pilni (40 arba 60)
    if (points === maxLifePoints) {
        pointsElement.style.color = 'green';
    } else {
        pointsElement.style.color = 'red';
    }

    // Patikriname, ar kuris nors iš žaidėjų pasiekė 0 taškų
    if (points === 0) {
        showWinner(player === 'player1' ? 'player2' : 'player1');  // Laimėtojas yra kitas žaidėjas
    }
}

function updatePlayerName(player) {
    let nameInput = document.getElementById(`${player}-name-input`);
    let pointsElement = document.getElementById(`${player}-points`);
    let points = parseInt(pointsElement.textContent.split(': ')[1]); // Gauname dabartinius taškus

    // Atnaujiname taškų rodymą su teisingu vardo atnaujinimu
    pointsElement.textContent = `${nameInput.value}: ${points} ${getPointsLabel(points)}`;
}

// Funkcija, kuri nustato tinkamą formuluotę priklausomai nuo taškų kiekio
function getPointsLabel(points) {
    let remainder10 = points % 10;  // Skaičiaus likutis nuo 10
    let remainder100 = points % 100;  // Skaičiaus likutis nuo 100

    // Atvejai, kai naudojama vienaskaita ("taškas")
    if (remainder10 === 1 && remainder100 !== 11) {
        return 'taškas';  // Pvz., 1, 21, 31
    }
    // Atvejai, kai naudojama daugiskaita ("taškai")
    else if (remainder10 >= 2 && remainder10 <= 9 && (remainder100 < 10 || remainder100 >= 20)) {
        return 'taškai';  // Pvz., 2, 22, 32
    }
    // Likę atvejai naudoja "taškų"
    else {
        return 'taškų';  // Pvz., 0, 10, 11, 30, 40
    }
}

// Funkcija, kuri parodo iššokančią lentelę su laimėtoju
function showWinner(winner) {
    let winnerName = document.getElementById(`${winner}-name-input`).value;  // Laimėtojo vardas
    let winnerPopup = document.createElement('div');  // Sukuriame iššokančią lentelę
    winnerPopup.innerHTML = `<div class="winner-popup"><p>Sveikiname ${winnerName}! Tu laimėjai!</p></div>`;
    document.body.appendChild(winnerPopup);

    // Pradedame groti cheering garsą
    let cheeringSound = document.getElementById('cheering-sound');
    cheeringSound.play();

    // Automatiškai paslepia lentelę po 5 sekundžių
    setTimeout(() => {
        document.body.removeChild(winnerPopup);
    }, 5000);
}

function playClickSound() {
    let sound = document.getElementById('click-sound');
    sound.pause();  // Sustabdyk grojantį garsą
    sound.currentTime = 0;  // Grąžink į pradžią
    sound.play();  // Iš naujo paleisk garsą
}
