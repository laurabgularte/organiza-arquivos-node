const fs = require("fs/promises");
const path = require("path");

async function createTestEnvironment() {
  const dir = "./arquivos_teste";

  try {
    // Cria a pasta se ela não existir
    await fs.mkdir(dir, { recursive: true });
    console.log(`📂 Criando ambiente em: ${dir}`);

    // Gera 50 arquivos .txt e 10 .pdf para teste
    for (let i = 1; i <= 60; i++) {
      const extension = i <= 50 ? ".txt" : ".pdf";
      const fileName = `documento_antigo_${i}${extension}`;
      const filePath = path.join(dir, fileName);

      await fs.writeFile(filePath, `Conteúdo original do arquivo ${i}`);
    }

    console.log("✅ Ambiente pronto! 60 arquivos criados.");
  } catch (err) {
    console.error("❌ Erro ao criar ambiente:", err);
  }
}

createTestEnvironment();
