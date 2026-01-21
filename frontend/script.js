// Criar inputs de nomes
function criarInputsNomes() {
    const container = document.getElementById('inputsNomes');
    for (let i = 1; i <= 16; i++) {
        const div = document.createElement('div');
        div.className = 'input-row';
        div.innerHTML = `
            <span>${i}.</span>
            <input 
                type="text" 
                id="nome${i}" 
                placeholder="Nome da pessoa ${i}"
                required
            >
        `;
        container.appendChild(div);
    }
}

// Mostrar mensagem
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    
    setTimeout(() => {
        mensagem.classList.add('hidden');
    }, 5000);
}

// Coletar nomes
function coletarNomes() {
    const nomes = [];
    for (let i = 1; i <= 16; i++) {
        const input = document.getElementById(`nome${i}`);
        const nome = input.value.trim();
        if (nome) nomes.push(nome);
    }
    return nomes;
}

// Validar nomes
function validarNomes(nomes) {
    if (nomes.length < 16) {
        mostrarMensagem(
            `❌ Erro: Você preencheu apenas ${nomes.length} nomes. São necessários exatamente 16 nomes!`,
            'erro'
        );
        return false;
    }

    const nomesUnicos = new Set(nomes.map(n => n.toLowerCase()));
    if (nomesUnicos.size !== 16) {
        mostrarMensagem(
            '❌ Erro: Existem nomes duplicados! Cada pessoa deve ter um nome único.',
            'erro'
        );
        return false;
    }

    return true;
}

// Gerar distribuição
async function gerarDistribuicao(event) {
    event.preventDefault();
    
    const nomes = coletarNomes();
    
    if (!validarNomes(nomes)) return;

    try {
        const response = await fetch('/api/gerar-funcoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nomes })
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarMensagem(`❌ Erro: ${data.erro}`, 'erro');
            return;
        }

        exibirResultado(data.distribuicao);
        mostrarMensagem('✅ Distribuição gerada com sucesso!', 'sucesso');

    } catch (error) {
        mostrarMensagem('❌ Erro ao conectar com o servidor', 'erro');
    }
}

// Exibir resultado
function exibirResultado(distribuicao) {
    const resultado = document.getElementById('resultado');
    
    const html = `
        <div id="listaDistribuicao">
            ${distribuicao.map(pessoa => `
                <div class="pessoa-card ${pessoa.fiscal ? 'fiscal' : ''}">
                    <div class="pessoa-nome">
                        ${pessoa.nome}
                        ${pessoa.fiscal ? '<span class="badge-fiscal">⭐ FISCAL</span>' : ''}
                    </div>
                    <div class="pessoa-funcao">
                        <strong>Função:</strong> ${pessoa.funcao_principal}
                    </div>
                </div>
            `).join('')}
        </div>
        <button onclick="document.getElementById('formNomes').dispatchEvent(new Event('submit'))" class="btn btn-primary" style="margin-top: 16px; width: 100%;">
            <span>🔀</span> Regerar Distribuição
        </button>
    `;
    
    resultado.innerHTML = html;
}

// Limpar tudo
function limparTudo() {
    for (let i = 1; i <= 16; i++) {
        document.getElementById(`nome${i}`).value = '';
    }
    
    document.getElementById('resultado').innerHTML = `
        <div class="placeholder-content">
            <p>Aguardando geração...</p>
            <small>Preencha os 16 nomes e clique em "Gerar Distribuição"</small>
        </div>
    `;
    
    document.getElementById('mensagem').classList.add('hidden');
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    criarInputsNomes();
    document.getElementById('formNomes').addEventListener('submit', gerarDistribuicao);
});