export interface Sector {
  id: number;
  name: string;
  parentId: number | null;
  subSectors?: Sector[];
}
