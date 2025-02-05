import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "src/app/models/course.model";
import { Category } from "src/app/models/category.model";
import { Chapter } from "src/app/models/chapter.model";
import {ChapterForm} from "src/app/models/chapterForm.model";
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) {}

    getUserScore(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${userId}/score`);
}
}