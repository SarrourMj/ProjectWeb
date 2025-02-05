import { ChapterForm } from './chapterForm.model';
import {Category} from './category.model';
export interface CourseForm {
  title: string;
  certificate: string | null;
  category: Category;
  content: string;
  mainImageUrl: string;
  chapters: ChapterForm[];
}