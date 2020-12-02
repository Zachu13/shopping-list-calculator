import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { SaveInStorageDialogComponent } from './save-in-storage-dialog.component';

describe('SaveInStorageDialogComponent', () => {
  let component: SaveInStorageDialogComponent;
  let fixture: ComponentFixture<SaveInStorageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveInStorageDialogComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveInStorageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
