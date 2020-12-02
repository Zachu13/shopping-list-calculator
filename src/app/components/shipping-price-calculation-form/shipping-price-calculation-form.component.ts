import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Order } from '../model/order';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FileStorageService } from 'src/app/services/file-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveInStorageDialogComponent } from '../save-in-storage-dialog/save-in-storage-dialog.component';
import { ErrorsService } from 'src/app/services/errors.service';
// Mat-table setup
export interface PeriodicElement {
  zone: string;
  shippingCost: number;
  extraShippingPrice: number;
  totalShippingPrice: number;
  totalPrice: number;
}

@Component({
  selector: 'app-shipping-price-calculation-form',
  templateUrl: './shipping-price-calculation-form.component.html',
  styleUrls: ['./shipping-price-calculation-form.component.scss'],
})
export class ShippingPriceCalculationFormComponent implements OnInit {
  priceCalculation: FormGroup;

  private readonly discountAbove: number = 12500;
  private readonly discountPercentage: number = 5 * 0.01; // 5%
  private readonly extraShippingCost: number = 1995;
  private csvContent: HTMLInputElement;
  orders: Order[] = [];
  order: Order;
  zones: string[] = [];

  // Mat-table config start
  displayedColumns: string[] = [
    '#',
    'Zone',
    'Shipping price',
    'Extra shipping price',
    'Total shipping price',
    'Total price',
  ];
  dataSource = this.orders;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  // Mat-table config end

  constructor(
    private fb: FormBuilder,
    private fileStorageService: FileStorageService,
    private errorsService: ErrorsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  openDialogWithRef(ref: TemplateRef<any>): void {
    this.dialog.open(ref);
  }

  createForm(): void {
    this.priceCalculation = this.fb.group({
      postcode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{5}$/),
        ]),
      ], // pattern: (/^\d{5}$/)
      totalOrderAmount: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9.]*$/),
        ]),
      ], // pattern(/^\d+$/)
      longProduct: [false],
    });
  }

  onSubmit(): void {
    if (!localStorage.getItem('zones') && this.zones.length === 0) {
      this.errorsService.showErrorAlert('Please provide a csv file with zones');
      return;
    } else if (this.zones.length === 0) {
      this.zones = this.fileStorageService.fetchAndFormatCsvFile();
    }

    const order = this.modifyInput(this.priceCalculation);

    if (order) {
      this.addRowData(order); // Add row to mat-table
    }
  }

  modifyInput(form: FormGroup): Order {
    const zone = form.get('postcode').value;
    const totalOrderAmount = form.get('totalOrderAmount').value;
    const longProduct = form.get('longProduct').value;
    const zoneCode = this.extractZoneDigitsFromPostcode(zone);

    let extraShippingCost = 0;
    let totalShippingCost = 0;

    const shippingCost = this.getShippingPriceByZone(zoneCode);
    if (isNaN(shippingCost)) {
      this.errorsService.showErrorAlert(
        'The postcode does not match any zone code.',
        'Please enter a valid postcode.'
      );
      return;
    } else {
      totalShippingCost = shippingCost;

      if (longProduct === true) {
        extraShippingCost = this.getExtraShippingCost(this.extraShippingCost);
        totalShippingCost += extraShippingCost;
      }

      const shippingPriceAfterDiscount = this.calculateDiscountedShippingCost(
        totalOrderAmount,
        totalShippingCost,
        this.discountAbove,
        this.discountPercentage
      );

      const totalPrice = this.getTotalPrice(
        shippingPriceAfterDiscount,
        totalOrderAmount
      );

      const order: Order = new Order(
        zone,
        shippingCost,
        extraShippingCost,
        shippingPriceAfterDiscount,
        totalPrice
      );

      return order;
    }
  }

  /**
   * Returns the total price for order
   */
  getTotalPrice(totalShippingCost: number, totalPrice: number): number {
    const total = totalShippingCost + totalPrice;
    return total;
  }

  /**
   * Returns the first two digits from provided postcode.
   */
  extractZoneDigitsFromPostcode(zoneCode: number): string {
    const zone = zoneCode.toString().substr(0, 2);
    return zone;
  }

  /**
   * Returns the shipping cost based on the provided @postcode
   */
  getShippingPriceByZone(postcode: string): number {
    let shippingCost: number;

    this.zones.forEach((element) => {
      const elem = element;
      if (postcode === elem[0]) {
        shippingCost = +elem[1];
      }
    });
    return shippingCost;
  }

  /**
   * The discount to the @totalShippingPrice will be applied if the @totalPrice of the order exceeds @discountAbove
   * @param totalPrice Total price of order
   * @param totalShippingPrice
   * @param discountAbove The amount from which the discount will be calculated
   * @param discountPercentage Discount percentage
   */
  calculateDiscountedShippingCost(
    totalPrice: number,
    totalShippingPrice: number,
    discountAbove: number,
    discountPercentage: number
  ): number {
    if (totalPrice > discountAbove) {
      totalShippingPrice =
        totalShippingPrice - totalShippingPrice * discountPercentage;
      return totalShippingPrice;
    } else {
      return totalShippingPrice;
    }
  }

  /**
   *  Returns the additional costs provided by @extraShippingCost if checkbox is selected
   */
  getExtraShippingCost(extraShippingCost: number): number {
    return extraShippingCost;
  }

  onFileSelect(input: HTMLInputElement): void {
    this.csvContent = input;
    this.zones = this.fileStorageService.onFileSelect(input);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SaveInStorageDialogComponent, {
      height: '180px',
      width: '250px',

      data: {
        zones: this.csvContent,
      },
      position: {
        top: '15%',
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  get postcode(): AbstractControl {
    return this.priceCalculation.get('postcode');
  }

  get totalOrderAmount(): AbstractControl {
    return this.priceCalculation.get('totalOrderAmount');
  }

  /**
   * Add row to mat-table
   */
  addRowData(rowItem: Order): void {
    this.orders.push(rowItem);
    this.table.renderRows();
  }
}
