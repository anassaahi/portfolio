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
        // Vite strips the base sometimes, so we check both
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
