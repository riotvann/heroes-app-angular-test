

import { Component, inject, Inject, model } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {


  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<Hero>(MAT_DIALOG_DATA);
  readonly animal = model(this.data);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

