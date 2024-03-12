function afficherResultat(score, nbMotsProposes) {
    let spanScore = document.querySelector(".zoneScore span")
    let affichageScore = `${score} / ${nbMotsProposes}`
    spanScore.innerText = affichageScore
}


function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}


function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score ÉcriPro&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur l'appli ÉcriPro du blog de max's !`
    location.href = mailto
}

function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("le nom est trop court")
    }
}

function validerEmail(email) {
    let emailreg = new RegExp("[a-z 0-9.-_]+@[a-z 0-9.-_]+\\.[a-z 0-9.-_]+")
    if (!emailreg.test(email)) {
        throw new Error("l'email n'est pas valide!!")
    }
}

function afficherMessageErreur(message) {
    let spanMessageErreur = document.getElementById("erreurMessage")
    if (!spanMessageErreur) {
        let popup = document.querySelector(".popup")
        spanMessageErreur = document.createElement('span')
        spanMessageErreur.id = "erreurMessage"
        popup.append(spanMessageErreur)

    }
    spanMessageErreur.innerText = message
}

function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById('nom')
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById('email')
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)
    } catch (erreur) {
        afficherMessageErreur(erreur.message)
    }

}


function lancerJeu() {
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(listeProposition[i])

    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }
    })

    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                listeProposition = listePhrases
            }
            afficherProposition(listeProposition[i])
        })
    }

    let form = document.querySelector('form')
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = ` ${score} / ${i}`
        gererFormulaire(scoreEmail)
    })

    afficherResultat(score, i)
}