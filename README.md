# 🎯 Sistema de Distribuição de Funções

Sistema completo para distribuir 16 funções fixas entre 16 pessoas, com 2 fiscais aleatórios.

## 🚀 Deploy no Vercel

### Passo 1: Preparar o Repositório no GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/distribuicao-funcoes.git
git push -u origin main
```

### Passo 2: Deploy no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Vercel detectará automaticamente a configuração
5. Clique em "Deploy"

## 💻 Executar Localmente
```bash
# Abra o arquivo frontend/index.html no navegador
# Para testar a API localmente, use:
python -m http.server 3000
```

## 📋 Regras do Sistema

- ✅ Exatamente 16 pessoas obrigatórias
- ✅ 16 funções fixas e imutáveis
- ✅ 2 fiscais selecionados aleatoriamente
- ✅ Distribuição aleatória das funções
- ✅ Validação de nomes únicos

## 🛠️ Tecnologias

- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Python (Serverless)
- Deploy: Vercel
- Versionamento: Git/GitHub

## 📦 Estrutura do Projeto
```
distribuicao-funcoes/
├── frontend/           # Interface do usuário
│   ├── index.html
│   ├── style.css
│   └── script.js
├── api/                # Backend serverless
│   └── gerar-funcoes.py
├── vercel.json         # Configuração do Vercel
└── README.md
```

## 🎨 Features

- Interface moderna e responsiva
- Validação em tempo real
- Mensagens de erro claras
- Distribuição aleatória
- Função de regerar mantendo os mesmos nomes
- Design mobile-friendly

## 📄 Licença

MIT