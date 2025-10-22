// Funções específicas do formulário de cadastro
function inicializarFormulario() {
    aplicarMascaras();
    
    // Buscar endereço via API real (ViaCEP)
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', function(e) {
            const cep = e.target.value.replace(/\D/g, '');
            
            if (cep.length === 8) {
                buscarEnderecoPorCEP(cep);
            }
        });
    }

    // Validação de idade mínima (18 anos)
    const dataNascimentoInput = document.getElementById('dataNascimento');
    if (dataNascimentoInput) {
        dataNascimentoInput.addEventListener('change', validarIdade);
    }

    // Validação do formulário
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', validarFormulario);
    }

    // Botão limpar formulário
    const btnLimpar = document.getElementById('limparFormulario');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparFormulario);
    }
}

function buscarEnderecoPorCEP(cep) {
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    
    // Mostrar loading
    const placeholders = {
        logradouro: logradouroInput.placeholder,
        bairro: bairroInput.placeholder,
        cidade: cidadeInput.placeholder,
        estado: estadoInput.placeholder
    };
    
    logradouroInput.placeholder = 'Buscando...';
    bairroInput.placeholder = 'Buscando...';
    cidadeInput.placeholder = 'Buscando...';
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(data => {
            if (!data.erro) {
                logradouroInput.value = data.logradouro || '';
                bairroInput.value = data.bairro || '';
                cidadeInput.value = data.localidade || '';
                estadoInput.value = data.uf || '';
            } else {
                mostrarMensagem('CEP não encontrado. Por favor, preencha o endereço manualmente.', 'aviso');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            mostrarMensagem('Erro ao buscar CEP. Por favor, preencha o endereço manualmente.', 'erro');
        })
        .finally(() => {
            // Restaurar placeholders
            logradouroInput.placeholder = placeholders.logradouro;
            bairroInput.placeholder = placeholders.bairro;
            cidadeInput.placeholder = placeholders.cidade;
        });
}

function validarIdade(e) {
    const dataNascimento = new Date(e.target.value);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    
    if (idade < 18) {
        mostrarMensagem('É necessário ter 18 anos ou mais para se cadastrar como voluntário.', 'aviso');
        e.target.value = '';
        e.target.focus();
    }
}

function validarFormulario(e) {
    e.preventDefault();
    
    // Verificar se pelo menos uma área de interesse foi selecionada
    const interesses = document.querySelectorAll('input[name="interesses"]:checked');
    if (interesses.length === 0) {
        mostrarMensagem('Por favor, selecione pelo menos uma área de interesse.', 'aviso');
        return;
    }

    // Verificar termos
    if (!document.getElementById('termos').checked) {
        mostrarMensagem('Você deve aceitar os termos de uso para se cadastrar.', 'aviso');
        return;
    }

    // Simular envio bem-sucedido
    mostrarMensagem('Cadastro enviado com sucesso! Entraremos em contato em breve.', 'sucesso');
    this.reset();
}

function limparFormulario() {
    if (confirm('Tem certeza que deseja limpar todo o formulário?')) {
        document.getElementById('formCadastro').reset();
    }
}

function mostrarMensagem(mensagem, tipo) {
    // Criar elemento de mensagem
    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.textContent = mensagem;
    mensagemDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    if (tipo === 'sucesso') {
        mensagemDiv.style.background = 'var(--accent)';
    } else if (tipo === 'erro') {
        mensagemDiv.style.background = '#e74c3c';
    } else {
        mensagemDiv.style.background = '#f39c12';
    }
    
    document.body.appendChild(mensagemDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        mensagemDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (mensagemDiv.parentNode) {
                mensagemDiv.parentNode.removeChild(mensagemDiv);
            }
        }, 300);
    }, 5000);
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarFormulario();
});