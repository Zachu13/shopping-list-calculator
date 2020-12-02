import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPriceCalculationFormComponent } from './shipping-price-calculation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

describe('ShippingPriceCalculationFormComponent', () => {
  let component: ShippingPriceCalculationFormComponent;
  let fixture: ComponentFixture<ShippingPriceCalculationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingPriceCalculationFormComponent],
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatTableModule,
        MatDialogModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPriceCalculationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const form = fixture.debugElement.nativeElement;
    const inputPostcode = form.querySelector('[data-input="postcode"]');
    const inputTotalOrderAmount = form.querySelector('[data-input="total"]');
    expect(inputPostcode).toBeTruthy();
    expect(inputTotalOrderAmount).toBeTruthy();
  });

  it('should create input elements', () => {
    const form = fixture.componentInstance.priceCalculation;
    expect(form.get('postcode')).toBeTruthy();
    expect(form.get('totalOrderAmount')).toBeTruthy();
  });

  it('form should be valid', () => {
    const form = component.priceCalculation;
    expect(form.valid).toBeFalsy();
    const inputPostcode = form.get('postcode');
    const inputTotal = form.get('totalOrderAmount');
    inputPostcode.setValue('34444');
    inputTotal.setValue('qwerty');
    expect(form.valid).toBeFalsy();
    inputPostcode.setValue('qwerty');
    inputTotal.setValue('12321');
    expect(form.valid).toBeFalsy();
    inputPostcode.setValue('44444');
    inputTotal.setValue('44444');
    expect(form.valid).toBeTruthy();
  });

  it('form control postCode should be valid', () => {
    const inputPostcode = component.priceCalculation.get('postcode');
    inputPostcode.setValue('qwerty');
    expect(inputPostcode.valid).toBeFalsy();
    inputPostcode.setValue('4444');
    expect(inputPostcode.valid).toBeFalsy();
    inputPostcode.setValue('-2314');
    expect(inputPostcode.valid).toBeFalsy();
    inputPostcode.setValue('55555');
    expect(inputPostcode.valid).toBeTruthy();
  });

  it('should extract zone digits from post code', () => {
    expect(component.extractZoneDigitsFromPostcode(12345)).toBeTruthy();
    expect(component.extractZoneDigitsFromPostcode(55555)).toBe('55');
  });

  it('should get total price', () => {
    expect(component.getTotalPrice(5000, 3000)).toBe(8000);
  });

  it('should return an extra shipping cost', () => {
    const extraShippingCost = 300;
    expect(component.getExtraShippingCost(extraShippingCost)).toBe(300);
  });

  it('should calculate the shipping discount', () => {
    let totalPrice = 10000;
    const shippingPrice = 1000;
    const discountAbove = 5000;
    let discountPercentage = 5 * 0.01;

    expect(
      component.calculateDiscountedShippingCost(
        totalPrice,
        shippingPrice,
        discountAbove,
        discountPercentage
      )
    ).toBe(950);

    discountPercentage = 25 * 0.01;
    expect(
      component.calculateDiscountedShippingCost(
        totalPrice,
        shippingPrice,
        discountAbove,
        discountPercentage
      )
    ).toBe(750);

    totalPrice = 4000;
    expect(
      component.calculateDiscountedShippingCost(
        totalPrice,
        shippingPrice,
        discountAbove,
        discountPercentage
      )
    ).toBe(1000);
  });
});
