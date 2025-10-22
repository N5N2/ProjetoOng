// Máscaras para os campos
function mascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

function mascaraTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
    telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
    return telefone;
}

function mascaraCEP(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
    return cep;
}

// Aplicar máscaras
function aplicarMascaras() {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            e.target.value = mascaraCPF(e.target.value);
        });
    }
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            e.target.value = mascaraTelefone(e.target.value);
        });
    }
    
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            e.target.value = mascaraCEP(e.target.value);
        });
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    aplicarMascaras();
});