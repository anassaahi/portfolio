// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import fs from 'node:fs/promises';
import path from 'node:path';
import { Buffer } from 'node:buffer';

function adminUploadPlugin() {
  return {
    name: 'admin-upload',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // ─── Art upload endpoint ─────────────────────────
        if ((req.url === '/api/upload' || req.url === '/portfolio/api/upload') && req.method === 'POST') {
          // Increase payload limits by streaming the body
          const chunks = [];
          req.on('data', chunk => {
            chunks.push(chunk);
          });
          req.on('end', async () => {
            try {
              const body = Buffer.concat(chunks).toString('utf8');
              const payload = JSON.parse(body);
              
              const { image, filename: originalFilename, category, orientation, description } = payload;
              
              if (!image || !category || !orientation || !description) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Missing fields' }));
              }

              // `image` is a base64 string formatted like "data:image/webp;base64,UklGR..."
              const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');

              const ext = path.extname(originalFilename || '') || '.webp';
              const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
              
              const publicDir = path.join(process.cwd(), 'public', 'art', category.toString());
              const filePath = path.join(publicDir, filename);
              
              await fs.mkdir(publicDir, { recursive: true });
              await fs.writeFile(filePath, buffer);

              const configPath = path.join(process.cwd(), 'src', 'config.ts');
              let configContent = await fs.readFile(configPath, 'utf8');

              const escapedDesc = description.toString().replace(/"/g, '\\"');
              const newEntry = `      { src: "/portfolio/art/${category}/${filename}", orientation: "${orientation}", description: "${escapedDesc}" },`;

              if (category === 'photography') {
                configContent = configContent.replace(
                  /photography:\s*\[/,
                  `photography: [\n${newEntry}`
                );
              } else if (category === 'sketches') {
                configContent = configContent.replace(
                  /sketches:\s*\[/,
                  `sketches: [\n${newEntry}`
                );
              }

              await fs.writeFile(configPath, configContent);

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error("Upload error:", err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });

        // ─── Project upload endpoint ─────────────────────
        } else if ((req.url === '/api/project-upload' || req.url === '/portfolio/api/project-upload') && req.method === 'POST') {
          const chunks = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', async () => {
            try {
              const body = Buffer.concat(chunks).toString('utf8');
              const payload = JSON.parse(body);
              const { name, description, link, linkedin, skills, images, rank } = payload;

              if (!name || !description) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Name and description are required' }));
              }

              // Save uploaded images to public/projects/
              const savedImagePaths = [];
              if (images && images.length > 0) {
                const imgDir = path.join(process.cwd(), 'public', 'projects');
                await fs.mkdir(imgDir, { recursive: true });

                for (const img of images) {
                  const base64Data = img.data.replace(/^data:image\/\w+;base64,/, '');
                  const imgBuffer = Buffer.from(base64Data, 'base64');
                  const ext = path.extname(img.filename || '') || '.webp';
                  const imgFilename = `${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
                  const imgPath = path.join(imgDir, imgFilename);
                  await fs.writeFile(imgPath, imgBuffer);
                  savedImagePaths.push(`/portfolio/projects/${imgFilename}`);
                }
              }

              // Build new project entry string
              const escapedName = name.replace(/"/g, '\\"');
              const escapedDesc = description.replace(/"/g, '\\"');
              const escapedLink = (link || '').replace(/"/g, '\\"');
              const escapedLinkedin = (linkedin || '').replace(/"/g, '\\"');
              const skillsStr = (skills || []).map(s => `"${s.replace(/"/g, '\\"')}"`).join(', ');
              const imagesStr = savedImagePaths.map(p => `"${p}"`).join(', ');

              const newEntry = `    {\n      name: "${escapedName}",\n      description:\n        "${escapedDesc}",\n      link: "${escapedLink}",\n      skills: [${skillsStr}],\n      images: [${imagesStr}] as string[],\n      linkedin: "${escapedLinkedin}",\n    },`;

              const configPath = path.join(process.cwd(), 'src', 'config.ts');
              let configContent = await fs.readFile(configPath, 'utf8');

              // Insert at the correct rank position
              // Find the projects array and split into individual entries
              const projectsMatch = configContent.match(/projects:\s*\[([\s\S]*?)\],\s*\n\s*experience:/);
              if (!projectsMatch) throw new Error('Could not find projects array in config.ts');

              // Count existing entries to determine insertion point
              const projectsBlock = projectsMatch[1];
              const entryMatches = projectsBlock.match(/\{[\s\S]*?\},/g) || [];
              const totalProjects = entryMatches.length;

              // Clamp rank to valid range (1-based)
              const insertIndex = Math.max(0, Math.min(rank - 1, totalProjects));

              if (insertIndex >= totalProjects) {
                // Append at end — insert before the closing bracket
                configContent = configContent.replace(
                  /(\s*)\],\s*\n(\s*)experience:/,
                  `\n${newEntry}\n  ],\n  experience:`
                );
              } else {
                // Insert before the entry at insertIndex
                let pos = configContent.indexOf('projects: [') + 'projects: ['.length;
                let entriesFound = 0;
                // Walk through the string to find the insertion point
                for (let i = pos; i < configContent.length; i++) {
                  if (configContent[i] === '{') {
                    if (entriesFound === insertIndex) {
                      // Insert the new entry right before this opening brace
                      // Find the start of this line (walk back to newline)
                      let lineStart = i;
                      while (lineStart > 0 && configContent[lineStart - 1] !== '\n') lineStart--;
                      configContent = configContent.slice(0, lineStart) + newEntry + '\n' + configContent.slice(lineStart);
                      break;
                    }
                    // Skip to the matching closing brace + comma
                    let depth = 1;
                    i++;
                    while (i < configContent.length && depth > 0) {
                      if (configContent[i] === '{') depth++;
                      if (configContent[i] === '}') depth--;
                      i++;
                    }
                    entriesFound++;
                  }
                }
              }

              await fs.writeFile(configPath, configContent);

              // Return updated projects list
              const updatedEntries = (projectsBlock.match(/\{[\s\S]*?\},/g) || []).length + 1;

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: `Project added at position ${insertIndex + 1}` }));
            } catch (err) {
              console.error("Project upload error:", err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });

        // ─── Project reorder endpoint ────────────────────
        } else if ((req.url === '/api/project-reorder' || req.url === '/portfolio/api/project-reorder') && req.method === 'POST') {
          const chunks = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', async () => {
            try {
              const body = Buffer.concat(chunks).toString('utf8');
              const { projects } = JSON.parse(body);

              if (!Array.isArray(projects)) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'projects must be an array' }));
              }

              // Rebuild the full projects array as TypeScript code
              const entries = projects.map(p => {
                const escapedName = (p.name || '').replace(/"/g, '\\"');
                const escapedDesc = (p.description || '').replace(/"/g, '\\"');
                const escapedLink = (p.link || '').replace(/"/g, '\\"');
                const escapedLinkedin = (p.linkedin || '').replace(/"/g, '\\"');
                const skillsStr = (p.skills || []).map(s => `"${s.replace(/"/g, '\\"')}"`).join(', ');
                const imagesStr = (p.images || []).map(i => `"${i}"`).join(', ');

                return `    {\n      name: "${escapedName}",\n      description:\n        "${escapedDesc}",\n      link: "${escapedLink}",\n      skills: [${skillsStr}],\n      images: [${imagesStr}] as string[],\n      linkedin: "${escapedLinkedin}",\n    }`;
              }).join(',\n');

              const newProjectsArray = `projects: [\n${entries}\n  ]`;

              const configPath = path.join(process.cwd(), 'src', 'config.ts');
              let configContent = await fs.readFile(configPath, 'utf8');

              // Replace the entire projects array
              configContent = configContent.replace(
                /projects:\s*\[[\s\S]*?\],?\s*\n(\s*)experience:/,
                `${newProjectsArray},\n  experience:`
              );

              await fs.writeFile(configPath, configContent);

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error("Project reorder error:", err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });

        } else {
          next();
        }
      });
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://anassaahi.github.io',
  base: '/portfolio',
  vite: {
    plugins: [tailwindcss(), adminUploadPlugin()],
  },
});
