import { supabase } from './supabase';

export interface Subscriber {
    email: string;
    signup_date: string; // ISO timestamp
    source: string;
    survey_sent: boolean;
    survey_completed: boolean;
    reward_eligible: boolean;
    last_emailed_at: string | null;
}

export const DataStore = {
    getAllSubscribers: async (): Promise<Subscriber[]> => {
        try {
            const { data, error } = await supabase
                .from('subscribers')
                .select('*')
                .order('signup_date', { ascending: false });

            if (error) {
                console.error('Error fetching subscribers:', error);
                return [];
            }

            return data as Subscriber[];
        } catch (error) {
            console.error('Error reading subscribers:', error);
            return [];
        }
    },

    addSubscriber: async (subscriber: Subscriber): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('subscribers')
                .insert({
                    email: subscriber.email,
                    signup_date: subscriber.signup_date,
                    source: subscriber.source,
                    survey_sent: subscriber.survey_sent,
                    survey_completed: subscriber.survey_completed,
                    reward_eligible: subscriber.reward_eligible,
                    last_emailed_at: subscriber.last_emailed_at
                });

            if (error) {
                if (error.code === '23505') {
                    // Duplicate email - already exists
                    console.log('Subscriber already exists:', subscriber.email);
                    return false;
                }
                console.error('Error adding subscriber:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error writing subscriber:', error);
            return false;
        }
    },

    exists: async (email: string): Promise<boolean> => {
        try {
            const { data, error } = await supabase
                .from('subscribers')
                .select('email')
                .eq('email', email)
                .single();

            if (error && error.code !== 'PGRST116') {
                // PGRST116 = no rows found, which is fine
                console.error('Error checking subscriber:', error);
            }

            return !!data;
        } catch (error) {
            console.error('Error checking subscriber existence:', error);
            return false;
        }
    }
};
