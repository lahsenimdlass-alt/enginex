import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  account_type: 'individual' | 'pro' | 'premium';
  account_type_label: 'Particulier' | 'Professionnel';
  profile_image_url: string | null;
  subscription_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  created_at: string;
};

export type EquipmentType = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Listing = {
  id: string;
  user_id: string;
  category_id: string;
  equipment_type_id: string;
  title: string;
  description: string;
  price: number;
  year: number | null;
  region: string;
  city: string;
  brand: string | null;
  model: string | null;
  condition: 'new' | 'good' | 'used';
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  is_active: boolean;
  priority_score: number;
  views_count: number;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};
