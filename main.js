/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
const nameMapper = {
    uf: "estado",
    localidade: "cidade",
    logradouro: "rua"
};

const searchCep = async(evt) => {
    const element = evt.target;
    element.value = element.value.replace(/\D/g, "");
    element.value = element.value.length > 8
            ? element.value.substring(0, 8)
            : element.value;
    const cep = element.value;

    element.value = element.value.replace(/(\d{5})(\d)/, "$1-$2");

    if (isCepValid(cep) !== null) {
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;
    const dados = await fetch(url);
    const json = await dados.json();

    clearInput(element);
    if (typeof json.erro !== 'undefined' && json.erro) {
        return setInputError(element, "Cep não encontrado!");
    }

    for (let key in json) {
        let name = (typeof nameMapper[key] !== "undefined")
                ? nameMapper[key]
                : key;

        let input = $(`input[name='${name}']`);
        if (!input) {
            continue;
        }
        input.val(json[key]);
    }
};

$('input[name="cep"]').on('input', searchCep);