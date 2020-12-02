import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileStorageService } from 'src/app/services/file-storage.service';

@Component({
  selector: 'app-save-in-storage-dialog',
  templateUrl: './save-in-storage-dialog.component.html',
  styleUrls: ['./save-in-storage-dialog.component.scss'],
})
export class SaveInStorageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SaveInStorageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileStorageService: FileStorageService
  ) {}

  ngOnInit(): void {}

  saveDataInStorage(): void {
    this.fileStorageService.saveFileInStorage(this.data.zones);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
