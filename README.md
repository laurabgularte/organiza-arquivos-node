# 📂 Renomeando arquivos (Node.js)

Um utilitário de linha de comando robusto para renomear milhares de arquivos de uma só vez, com sistema de segurança para desfazer alterações indesejadas.

## ✨ Funcionalidades

- **Renomeio em Massa**: Filtra arquivos por extensão e aplica novos padrões.
- **Sistema de Undo**: Gera um log JSON temporário que permite reverter os nomes originais.
- **Ambiente de Teste**: Script incluso para gerar arquivos fictícios com segurança.

## 🛠️ Como usar

1. Clone o repositório.
2. Gere os arquivos de teste: `node setup-test.js`
3. Execute o renomeio: `node index.js --rename`
4. Se precisar reverter: `node index.js --undo`

## 🧠 Conceitos Aplicados

- Manipulação de File System (fs/promises) no Node.js.
- Persistência de dados em arquivos JSON.
- Processamento assíncrono e tratamento de erros.
