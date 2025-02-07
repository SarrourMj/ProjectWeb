import { Category } from './category.model';
import { Chapter } from './chapter.model';
import { Certificate} from './certificate.model';
export interface Course {
  id: number;
  title: string;
  certificate: Certificate| null;
  category: Category;
  content: string;
  slug: string;
  createdOn: string;
  modifiedOn: string;
  mainimageurl: string;
  chapters: Chapter[];
}