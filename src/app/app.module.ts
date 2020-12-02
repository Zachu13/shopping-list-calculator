import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShippingPriceCalculationFormComponent } from './components/shipping-price-calculation-form/shipping-price-calculation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SaveInStorageDialogComponent } from './components/save-in-storage-dialog/save-in-storage-dialog.component';
@NgModule({
  declarations: [AppComponent, ShippingPriceCalculationFormComponent, SaveInStorageDialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
