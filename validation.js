/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */



const requiredValidation = (val) => {
    return val.trim() !== "" ? null : "Este campo é requerido.";
};

const isCepValid = (val) => {
    const cep = val.replace(/\D/g, "");
    return (cep.length === 8) ? null : "Cep inválido.";
};

const isEmailValid = (val) => {
    const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val).toLowerCase()) ? null : "Email inválido.";
};

const isPasswordValid = (val) => {
    let message = "Digite pelo menos 6 caracteres contendo letras, números e um caractere especial";
    if (val.length < 6) {
        return message;
    }
    if (val.replace(/\D/g, "") === "") {
        return message;
    }

    if (val.replace(/\d/g, "") === "") {
        return message;
    }

    if (val.replace(/[0-9A-Za-z]/g, "") === "") {
        return message;
    }

    return null;
};

const validationForInputs = {
    nome: requiredValidation,
    sobrenome: requiredValidation,
    email: isEmailValid,
    senha: isPasswordValid,
    cep: isCepValid,
    rua: requiredValidation,
    bairro: requiredValidation,
    cidade: requiredValidation,
    estado: requiredValidation,
    numero: requiredValidation
};



const clearInput = (input) => {
    $(input).parent().find('.invalid-feedback').remove();
    $(input).removeClass('is-invalid');
};

const setInputError = (input, errMsg) => {
    $(input).addClass("is-invalid");
    $(input).parent().append(`<div class="invalid-feedback">
                    ${errMsg}
                  </div>`);
};

const validateInput = (input) => {
    if (typeof validationForInputs[input.name] === "function") {
        let errMsg = validationForInputs[input.name](input.value);
        clearInput(input);
        if (errMsg !== null) {
            setInputError(input, errMsg);
        }
    }
};

const validate = (e) => {
    e.preventDefault();
    $('input').each((idx, input) => {
        validateInput(input);
    });
};


$('button').on('click', validate);