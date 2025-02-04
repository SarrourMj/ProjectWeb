import { Chapter } from './chapter.model';
export interface Course {
  id: number;
  title: string;
  //description: string;
  certificate: string | null;
  background_image: string | null;
  category: string;
  content: string;
  slug: string;
  createdOn: string;
  modifiedOn: string;
  mainImageUrl: string;
  chapters: Chapter[];
}