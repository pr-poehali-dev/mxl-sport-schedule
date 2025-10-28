export interface Game {
  id: number;
  date: string;
  time: string;
  opponent: string;
  home: boolean;
  result: string | null;
  status: 'upcoming' | 'finished';
}

export interface Player {
  id: number;
  number: number;
  name: string;
  position: string;
  goals: number;
  assists: number;
}
