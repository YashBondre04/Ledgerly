import fs from 'fs';
import path from 'path';

export interface Subscriber {
    email: string;
    signup_date: string; // ISO timestamp
    source: string;
    survey_sent: boolean;
    survey_completed: boolean;
    reward_eligible: boolean;
    last_emailed_at: string | null;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'subscribers.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure file exists with empty array if not present
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), 'utf8');
}

export const DataStore = {
    getAllSubscribers: (): Subscriber[] => {
        try {
            const data = fs.readFileSync(FILE_PATH, 'utf8');
            return JSON.parse(data) as Subscriber[];
        } catch (error) {
            console.error('Error reading subscribers file:', error);
            return [];
        }
    },

    addSubscriber: (subscriber: Subscriber): boolean => {
        try {
            const subscribers = DataStore.getAllSubscribers();
            // Check for duplicates
            if (subscribers.some(s => s.email === subscriber.email)) {
                return false; // Already exists
            }
            subscribers.push(subscriber);
            fs.writeFileSync(FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error writing subscribers file:', error);
            return false;
        }
    },

    exists: (email: string): boolean => {
        const subscribers = DataStore.getAllSubscribers();
        return subscribers.some(s => s.email === email);
    }
};
