import { Category } from './category.model';
import { Chapter } from './chapter.model';
export interface Course {
  id: number;
  title: string;
  certificate: string | null;
  background_image: string | null;
  category: Category;
  content: string;
  slug: string;
  createdOn: string;
  modifiedOn: string;
  mainImageUrl: string;
  chapters: Chapter[];
}