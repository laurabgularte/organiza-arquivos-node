const fs = require("fs/promises");
const path = require("path");

const LOG_FILE = "rename-history.json";
const TARGET_DIR = "./arquivos_teste";

async function massRename(directory, extension, prefix) {
  try {
    const files = await fs.readdir(directory);
    const filteredFiles = files.filter(
      (file) => path.extname(file) === extension,
    );

    if (filteredFiles.length === 0) {
      console.log(`⚠️ Nenhum arquivo ${extension} encontrado em ${directory}`);
      return;
    }

    const history = [];

    for (let i = 0; i < filteredFiles.length; i++) {
      const oldName = filteredFiles[i];
      const newName = `${prefix}_${i + 1}${extension}`;

      await fs.rename(
        path.join(directory, oldName),
        path.join(directory, newName),
      );

      history.push({ directory, oldName, newName });
    }

    await fs.writeFile(LOG_FILE, JSON.stringify(history, null, 2));
    console.log(`✅ Sucesso! ${history.length} arquivos renomeados.`);
    console.log(`📝 Log de histórico salvo em: ${LOG_FILE}`);
  } catch (error) {
    console.error("❌ Erro no processo:", error.message);
  }
}

async function undoRename() {
  try {
    const data = await fs.readFile(LOG_FILE, "utf-8");
    const history = JSON.parse(data);

    console.log(`⏪ Revertendo alterações em ${history.length} arquivos...`);

    for (const item of history) {
      await fs.rename(
        path.join(item.directory, item.newName),
        path.join(item.directory, item.oldName),
      );
    }

    await fs.unlink(LOG_FILE);
    console.log("✅ Desfeito! Nomes originais restaurados e log removido.");
  } catch (error) {
    console.error("❌ Erro ao desfazer: O arquivo de log não foi encontrado.");
  }
}

const action = process.argv[2];

if (action === "--rename") {
  massRename(TARGET_DIR, ".txt", "calculadora_projeto");
} else if (action === "--undo") {
  undoRename();
} else {
  console.log(`
    Utilize um comando válido:
    node index.js --rename  (Para renomear os arquivos)
    node index.js --undo    (Para desfazer a última ação)
    `);
}
