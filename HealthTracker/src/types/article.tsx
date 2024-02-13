export type ArticleDataType = {
  title: string;
  content: string;
  id: string;
  date: Date;
  visual?: string;
  visualType?: 'image' | 'video';
  coverImage?: string;
  visualDescription?: string;
};
