const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const sourceDir = 'app/src/views'; // Directory containing hbs files
const outputDir = 'app/public'; // Directory where HTML files will be saved
const partialsDir = path.join(sourceDir, 'partials'); // Directory containing partials
const layoutDir = path.join(sourceDir, 'layouts'); // Directory containing layout templates

// Read all hbs files in the source directory
const hbsFiles = fs.readdirSync(sourceDir).filter(file => path.extname(file) === '.hbs');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Register the partials
const partialFiles = fs.readdirSync(partialsDir).filter(file => path.extname(file) === '.hbs');

partialFiles.forEach(file => {
  const partialName = path.basename(file, '.hbs');
  const partialContent = fs.readFileSync(path.join(partialsDir, file), 'utf-8');
  handlebars.registerPartial(partialName, partialContent);
});

// Compile each hbs file with the layout and save it as an HTML file in the output directory
hbsFiles.forEach(file => {
  const filePath = path.join(sourceDir, file);
  const outputFilePath = path.join(outputDir, path.basename(file, '.hbs') + '.html');

  // Read the layout template
  const layoutTemplate = fs.readFileSync(path.join(layoutDir, 'main.hbs'), 'utf-8');
  
  // Compile the layout template
  const layout = handlebars.compile(layoutTemplate);
  
  // Read the main template (page)
  const pageSource = fs.readFileSync(filePath, 'utf-8');
  
  // Compile the main template with the layout
  const template = handlebars.compile(layout({ body: pageSource }));
  const html = template(/* provide data or context if needed */);

  fs.writeFileSync(outputFilePath, html);
  console.log(`Compiled ${file} to ${path.basename(file, '.hbs')}.html`);
});
