import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const PORTFOLIOS_FILE = path.join(DATA_DIR, 'portfolios.json');
const PRICES_FILE = path.join(DATA_DIR, 'prices.json');

async function readJson(file, fallback) {
  try {
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return fallback;
    throw err;
  }
}

async function writeJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

export function getPortfolios() {
  return readJson(PORTFOLIOS_FILE, { portfolios: [] });
}

export function savePortfolios(data) {
  return writeJson(PORTFOLIOS_FILE, data);
}

export function getPrices() {
  return readJson(PRICES_FILE, { fetchedAt: null, prices: {} });
}

export function savePrices(data) {
  return writeJson(PRICES_FILE, data);
}
