import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  inputFile: path.resolve(__dirname, '../components/index.js'),
  outputFile: path.resolve(__dirname, '../index.d.ts'),
  importPathPrefix: './components',
};


function parseExports(content) {
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('//'))
    .map(line => {
      const match = line.match(/^export\s+\*\s+as\s+(\w+)\s+from\s+['"](.+)['"]\s*;?$/);
      return match ? { componentName: match[1], relativePath: match[2] } : null;
    })
    .filter(item => item !== null);
}


function transformImportPath(relativePath, prefix) {
  if (relativePath.startsWith('./')) {
    return `${prefix}${relativePath.slice(1)}`;
  }
  return relativePath;
}


function generateDeclaration(components, prefix) {
  const lines = [
    '// Auto-generated Vue component type declarations',
    '// Do not edit manually - run `npm run build` to update',
    `declare module 'vue' {`,
    `  export interface GlobalComponents {`,
  ];

  for (const { componentName, relativePath } of components) {
    const importPath = transformImportPath(relativePath, prefix);
    lines.push(`    ${componentName}: typeof import('${importPath}')['${componentName}']`);
  }

  lines.push(`  }`, `}`, '');
  return lines.join('\n');
}


function main() {
  try {
    console.log(`Reading exports from: ${CONFIG.inputFile}`);

    if (!fs.existsSync(CONFIG.inputFile)) {
      throw new Error(`Input file not found: ${CONFIG.inputFile}`);
    }

    const content = fs.readFileSync(CONFIG.inputFile, 'utf-8');
    const components = parseExports(content);

    if (components.length === 0) {
      console.warn('No component exports found. Check your input file format.');
    } else {
      console.log(`Found ${components.length} component exports`);
    }

    const declaration = generateDeclaration(components, CONFIG.importPathPrefix);

    fs.writeFileSync(CONFIG.outputFile, declaration, 'utf-8');
    console.log(`Generated: ${CONFIG.outputFile}`);
    console.log(`Total components: ${components.length}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();