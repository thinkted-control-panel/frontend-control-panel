const fs = require('fs');
const path = require('path');

const files = [
  "app/usuarios/admins/page.tsx",
  "app/sistemas/gameted/aprovacoes/page.tsx",
  "app/sistemas/gameted/aprovacoes/edicao/page.tsx",
  "app/sistemas/thinklib/aprovacoes/edicao/page.tsx",
  "app/sistemas/thinklib/aprovacoes/aprovada/page.tsx",
  "app/sistemas/thinklib/aprovacoes/page.tsx",
  "app/sistemas/thinklib/aprovacoes/reprovada/page.tsx",
  "app/sistemas/thinklib/aprovacoes/visualizar/page.tsx"
];

const basePath = "c:/Users/joseb/PAINEL/frontend-control-panel";

files.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match the div and extract the parts
  const divRegex = /<div className="text-xs text-\[#8E95A5\] font-poppins -mb-2">\s*([\s\S]*?)\s*<\/div>/;
  const match = content.match(divRegex);
  
  if (match) {
    const innerHtml = match[1];
    
    // Clean up HTML tags and weird spaces
    let cleanText = innerHtml
      .replace(/<span[^>]*>(.*?)<\/span>/g, (match, p1) => {
        if (match.includes('mx-1')) return ' / '; // separator
        return p1; // inner text
      })
      .replace(/{" "}/g, ' ')
      .replace(/\s+/g, ' '); // collapse spaces
    
    const parts = cleanText.split('/').map(s => s.trim()).filter(s => s);
    
    // Check if it already has Breadcrumb import
    if (!content.includes("import { Breadcrumb }")) {
      const importStatement = "import { Breadcrumb } from '@/components/Breadcrumb';\n";
      // Find the last import
      const lastImportIndex = content.lastIndexOf("import ");
      if (lastImportIndex !== -1) {
        const endOfLastImport = content.indexOf("\n", lastImportIndex) + 1;
        content = content.slice(0, endOfLastImport) + importStatement + content.slice(endOfLastImport);
      } else {
        if (content.includes('"use client"')) {
            content = content.replace(/"use client";?\n/, '"use client";\n' + importStatement);
        } else {
            content = importStatement + content;
        }
      }
    }
    
    const itemsArrayStr = `['${parts.join("', '")}']`;
    content = content.replace(divRegex, `<Breadcrumb items={${itemsArrayStr}} />`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}: ${itemsArrayStr}`);
  } else {
    console.log(`No match found in ${file}`);
  }
});
