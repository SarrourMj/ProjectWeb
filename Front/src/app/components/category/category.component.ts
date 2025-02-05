import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CategoryComponent implements OnInit {
  category: { title: string } = { title: '' };
  categories: Category[] = [];
  loading = false;
  editMode = false;
  currentEditId: number | null = null;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.apiService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        this.handleError('Failed to load categories', error);
        this.loading = false;
      }
    });
  }

  createCategory(form: NgForm): void {
    if (form.invalid) return;

    this.loading = true;
    this.apiService.createCategory(this.category).subscribe({
      next: (response) => {
        this.showSuccess('Category created successfully');
        this.resetForm(form);
        this.loadCategories();
      },
      error: (error) => this.handleError('Failed to create category', error)
    });
  }

  startEdit(category: Category): void {
    this.editMode = true;
    this.currentEditId = category.id;
    this.category.title = category.title;
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteCategory(id)
    });
  }

  deleteCategory(id: number): void {
    this.apiService.deleteCategory(id).subscribe({
      next: () => {
        this.showSuccess('Category deleted successfully');
        this.loadCategories();
      },
      error: (error) => this.handleError('Failed to delete category', error)
    });
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.category = { title: '' };
    this.editMode = false;
    this.currentEditId = null;
    this.loading = false;
  }

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message
    });
  }

  handleError(message: string, error: any): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `${message}: ${error?.message || 'Unknown error'}`
    });
    this.loading = false;
    console.error(error);
  }
}