const $ = element => document.querySelector(element);

const form = $('.card__form');
const resultado = $('#resultado');
const error = $('#error');

const operation = {
    suma: 'suma',
    resta: 'resta',
    multiplicacion: 'multiplicacion',
    division: 'division'
}
const operadores = {
    suma: '+',
    resta: '-',
    multiplicacion: 'x',
    division: '/',
}

form.addEventListener('submit', (e) => {
    error.className = "hidden";
    e.preventDefault();
    const triggerBtn = e.submitter.id;
    const form = e.target;
    const inputFields = Object.fromEntries(new FormData(form));
    let res = null;
    let haveError = false;
    switch (triggerBtn) {
        case operation.suma: {
            res = suma(inputFields.n1, inputFields.n2)
            break
        }
        case operation.resta: {
            res = resta(inputFields.n1, inputFields.n2)
            break
        }
        case operation.multiplicacion: {
            res = multp(inputFields.n1, inputFields.n2)
            break
        }
        case operation.division: {
            const calculation  = div(inputFields.n1, inputFields.n2)
            if (!calculation.ok) {
                haveError = true;
            } else {
                res = calculation.res;
            }
            break
        }
    }
    if (!haveError) {
        resultado.className = "show";
        resultado.innerText = `${inputFields.n1} ${operadores[triggerBtn]} ${inputFields.n2} = ${res.toString().includes(".") ? res.toFixed(2) : res}`
    } else {
        resultado.className == "show" ? resultado.className = "hidden" : null;
        error.className = "show";
        error.innerText = "No se puede dividir entre 0";
    }

})


const suma = (n1, n2) => {
    if (isNotNumber(n1) && isNotNumber(n2)) {
        return null;
    }
    return Number(n1) + Number(n2);
}

const resta = (n1, n2) => {
    if (isNotNumber(n1) && isNotNumber(n2)) {
        return null;
    }
    return n1 - n2;
}

const multp = (n1, n2) => {
    if (isNotNumber(n1) && isNotNumber(n2)) {
        return null;
    }
    return n1 * n2;
}

const div = (n1, n2) => {
    if (isNotNumber(n1) && isNotNumber(n2)) {
        return null;
    }
    if (Number(n2) === 0) {
        console.log("aqui");
        return {
            ok: false
        }
    }
    return {
        ok: true,
        res: n1 / n2
    };
}

function isNotNumber(n) {
    return isNaN(Number(n))
}