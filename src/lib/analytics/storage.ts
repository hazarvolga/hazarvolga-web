import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'analytics.json');

export interface PageView {
    id: string; // Unique event ID
    sessionId: string;
    path: string;
    section: string;
    duration: number; // Seconds spent
    timestamp: string;
    country?: string;
    ip?: string; // Optional: hash or mask for privacy if needed
    userAgent?: string;
}

export interface AnalyticsData {
    pageViews: PageView[];
}

// Ensure DB exists
async function initDB() {
    try {
        await fs.access(DB_FILE);
    } catch (error) {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(DB_FILE, JSON.stringify({ pageViews: [] }, null, 2));
    }
}

export async function saveEvent(event: Omit<PageView, 'id' | 'timestamp'>) {
    await initDB();

    const rawData = await fs.readFile(DB_FILE, 'utf-8');
    const data: AnalyticsData = JSON.parse(rawData);

    const newEvent: PageView = {
        ...event,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
    };

    // Limit array size to prevent infinite growth in this simple file-based system
    // Keep last 10,000 events
    if (data.pageViews.length > 10000) {
        data.pageViews = data.pageViews.slice(-9000);
    }

    data.pageViews.push(newEvent);
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    return newEvent;
}

export async function getStats() {
    await initDB();
    const rawData = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(rawData) as AnalyticsData;
}
