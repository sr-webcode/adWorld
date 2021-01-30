type TListData = {
  id: number;
  text: string;
};

export interface IAdEvents {
  title: string;
  bgColor: string;
  meet: TListData[];
  learn: TListData[];
  description: string;
  isLight: boolean;
}
