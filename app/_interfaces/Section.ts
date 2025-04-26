export interface Section {
  id: string;
  title: string;
  subtitle: string;
  items: {
    title: string;
    locked: boolean;
    questions?: number;
    minutes?: number;
  }[];
}
