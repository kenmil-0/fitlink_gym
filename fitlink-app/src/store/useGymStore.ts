import { create } from 'zustand';

export interface Gym {
  id: number;
  name: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  description?: string;
  image_url?: string;
  distance?: number;
}

interface GymState {
  selectedGym: Gym | null;
  availableGyms: Gym[];
  isLoading: boolean;
  setSelectedGym: (gym: Gym | null) => void;
  setAvailableGyms: (gyms: Gym[]) => void;
  setLoading: (loading: boolean) => void;
  clearGymData: () => void;
}

export const useGymStore = create<GymState>((set) => ({
  selectedGym: null,
  availableGyms: [],
  isLoading: false,

  setSelectedGym: (gym) => set({ selectedGym: gym }),
  setAvailableGyms: (gyms) => set({ availableGyms: gyms }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearGymData: () => set({ selectedGym: null, availableGyms: [] }),
}));
