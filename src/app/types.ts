export type GroupItem = {
  id: string;
  code: string;
  name: string;
  points: number;
};

export type GroupData = {
  [key: string]: GroupItem[];
};

export type Groups = {
  data: GroupData;
};
