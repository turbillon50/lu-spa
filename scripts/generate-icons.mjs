import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')

// source SVG -> [ { out, size } ]
const jobs = [
  { src: 'icon-512.svg', out: 'icon-192.png', size: 192 },
  { src: 'icon-512.svg', out: 'icon-512.png', size: 512 },
  { src: 'icon-maskable.svg', out: 'icon-maskable-512.png', size: 512 },
  { src: 'apple-icon.svg', out: 'apple-touch-icon.png', size: 180 },
  { src: 'icon-512.svg', out: 'icon-32.png', size: 32 }
]

for (const { src, out, size } of jobs) {
  const svg = await readFile(join(pub, src))
  const png = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'cover' })
    .png()
    .toBuffer()
  await writeFile(join(pub, out), png)
  console.log(`generated ${out} (${size}x${size}) — ${png.length} bytes`)
}
