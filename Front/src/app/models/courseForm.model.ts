import { ChapterForm } from './chapterForm.model';
import {Category} from './category.model';
export interface CourseForm {
  title: string;
  category: Category;
  content: string;
  mainimageurl: string;
  certificateImageUrl: string;
  chapters: ChapterForm[];
}