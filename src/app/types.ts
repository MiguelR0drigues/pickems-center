export type GroupItem = {
  countryId: string;
  code: string;
  name: string;
  points: number;
  order: number;
};

export type GroupData = {
  [key: string]: GroupItem[];
};

export type Groups = {
  data: GroupData;
};
