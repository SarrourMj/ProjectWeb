import { ChapterForm } from './chapterForm.model';
import {Category} from './category.model';
import { CertificateForm } from './certificateForm.model';
export interface CourseForm {
  title: string;
  certificate: CertificateForm | null;
  category: Category;
  content: string;
  mainimageurl: string;
  chapters: ChapterForm[];
}