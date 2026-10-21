
const campoCEP = document.getElementById("cep");

campoCEP.addEventListener("input", function () {
    // Remove tudo que não for número
    let cep = this.value.replace(/\D/g, "").slice(0, 8);

    // Formata o CEP: 00000-000
    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
    }

    this.value = cep;
});

// Busca automaticamente ao sair do campo CEP
campoCEP.addEventListener("blur", buscarCEP);

// Também permite buscar pressionando Enter
campoCEP.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buscarCEP();
    }
});

async function buscarCEP() {
    const cep = campoCEP.value.replace(/\D/g, "");
    const mensagem = document.getElementById("mensagem");

    if (cep.length === 0) {
        return;
    }

    if (cep.length !== 8) {
        mensagem.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    mensagem.textContent = "Buscando endereço...";

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Erro na consulta do CEP.");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            mensagem.textContent = "CEP não encontrado.";
            limparEndereco();
            return;
        }

        // Preenche automaticamente os campos
        document.getElementById("logradouro").value =
            dados.logradouro || "";

        document.getElementById("bairro").value =
            dados.bairro || "";

        document.getElementById("cidade").value =
            dados.localidade || "";

        document.getElementById("uf").value =
            dados.uf || "";

        mensagem.textContent =
            "Endereço preenchido! Confira as informações.";

    } catch (erro) {
        mensagem.textContent =
            "Não foi possível consultar o CEP. Tente novamente.";
    }
}

function limparEndereco() {
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
}
