const fs = require("fs");
const path = require("path");

const name = process.argv[2];

if (!name) {
  console.error("❌ Masukkan nama entity, misal: npm run generate user");
  process.exit(1);
}

const pascalCase = name[0].toUpperCase() + name.slice(1);
const kebabCase = name.toLowerCase();

const basePath = path.join(__dirname, "../src", name);

// Buat folder utama untuk entity (misal: src/user)
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
} else {
  console.log(`📁 Folder ${basePath} sudah ada, lanjut membuat file...`);
}

// Daftar file yang ingin dibuat
const files = ["controller", "service", "repository"];

files.forEach((type) => {
  const filePath = path.join(basePath, `${name}.${type}.ts`);

  if (fs.existsSync(filePath)) {
    console.log(`⚠️  File ${filePath} sudah ada, dilewati.`);
    return;
  }

  const template = `// ${pascalCase} ${type.charAt(0).toUpperCase() + type.slice(1)}\n`;

  fs.writeFileSync(filePath, template, "utf8");
  console.log(`✅ Created ${filePath}`);
});
