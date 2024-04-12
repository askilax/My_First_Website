function addToDisplay(value) {
    let display = document.getElementById('display')
    if (display) {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Erreur';
    }
}

function inchesToCm() {
    let display = document.getElementById('display')
    if (display) {
        const inches = parseFloat(display.value)
        const cm = inches * 2.54
        display.value = cm.toFixed(2) + ' cm';
    }
}

function calculerPourcentage() {
    let valeur = parseFloat(document.getElementById("valeur").value)
    let pourcentage = parseFloat(document.getElementById("pourcentage").value)
    let resultat = (valeur * pourcentage) / 100
    document.getElementById("resultat").innerText = pourcentage + "% de " + valeur + " est égal à " + resultat
}