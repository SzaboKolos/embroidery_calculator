import {Injectable} from "@angular/core";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {PricesDTO} from "../models/prices-dto";
import {OrderDto} from "../models/order-dto";

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  // Category
  static category$: BehaviorSubject<number> = new BehaviorSubject(0);
  static category = CalculatorService.category$.asObservable();
  // Base Prices
  static basePrice$: BehaviorSubject<number> = new BehaviorSubject(200);
  static basePrice = CalculatorService.basePrice$.asObservable();

  static baseBroughtPrice$: BehaviorSubject<number> = new BehaviorSubject(500);
  static baseBroughtPrice = CalculatorService.baseBroughtPrice$.asObservable();
  // Stitch Prices
  static baseStitchPrice$: BehaviorSubject<number> = new BehaviorSubject(1);
  static baseStitchPrice = CalculatorService.baseStitchPrice$.asObservable();

  static baseStitchSulkyPrice$: BehaviorSubject<number> = new BehaviorSubject(1);
  static baseStitchSulkyPrice = CalculatorService.baseStitchSulkyPrice$.asObservable();

  static baseStitchGoldPrice$: BehaviorSubject<number> = new BehaviorSubject(8);
  static baseStitchGoldPrice = CalculatorService.baseStitchGoldPrice$.asObservable();

  static baseStitchTexPrice$: BehaviorSubject<number> = new BehaviorSubject(8);
  static baseStitchTexPrice = CalculatorService.baseStitchTexPrice$.asObservable();
  // Multipliers
  static multiplier$: BehaviorSubject<number> = new BehaviorSubject(1);
  static multiplier = CalculatorService.multiplier$.asObservable();

  static externalMultiplier$: BehaviorSubject<number> = new BehaviorSubject(2);
  static externalMultiplier = CalculatorService.externalMultiplier$.asObservable();

  static setCategory(val: number) {
    CalculatorService.category$.next(val);
  }

  static setPricesByDTO(pricesDTO: PricesDTO) {
    CalculatorService.basePrice$.next(pricesDTO.price);
    CalculatorService.baseBroughtPrice$.next(pricesDTO.broughtPrice);

    CalculatorService.baseStitchPrice$.next(pricesDTO.stitchPrice);
    CalculatorService.baseStitchSulkyPrice$.next(pricesDTO.stitchSulkyPrice);
    CalculatorService.baseStitchGoldPrice$.next(pricesDTO.stitchGoldPrice);
    CalculatorService.baseStitchTexPrice$.next(pricesDTO.stitchTexPrice);

    CalculatorService.multiplier$.next(pricesDTO.multiplier);
    CalculatorService.externalMultiplier$.next(pricesDTO.externalMultiplier);

    // saves prices to localstorage for later use
    localStorage.setItem('pricesDTO', JSON.stringify(pricesDTO));
  }

  static async getCategory(): Promise<number> {
    return await firstValueFrom(this.category).then((value: number) => {
      return value;
    });
  }

  static async getMultiplier(): Promise<number> {
    return await firstValueFrom(this.multiplier).then((num: number) => {
      return num;
    });
  }

  static async getBasePrice(): Promise<number> {
    return await firstValueFrom(this.basePrice).then((price: number) => {
      return price;
    });
  }

  static async getBaseBroughtPrice(): Promise<number> {
    return await firstValueFrom(this.baseBroughtPrice).then((price: number) => {
      return price;
    });
  }
  static async getNormalPrice(): Promise<number> {
    return await firstValueFrom(this.baseStitchPrice).then((price: number) => {
      return price / 100;
    });
  }

  static async getSulkyPrice(): Promise<number> {
    return await firstValueFrom(this.baseStitchSulkyPrice).then((price: number) => {
      return price / 100;
    });
  }

  static async getGoldPrice(): Promise<number> {
    return await firstValueFrom(this.baseStitchGoldPrice).then((price: number) => {
      return price / 100;
    });
  }

  static async getTexPrice(): Promise<number> {
    return await firstValueFrom(this.baseStitchTexPrice).then((price: number) => {
      return price / 100;
    });
  }

  static async getExternalMultiplier(): Promise<number> {
    return await firstValueFrom(this.externalMultiplier).then((price: number) => {
      return price;
    });
  }

  public static async calculatePatchPrice(order: OrderDto): Promise<number> {
    const basePrice = await CalculatorService.getBasePrice(); //def: 200
    const normalPrice = await CalculatorService.getNormalPrice(); //def: 0.01
    const sulkyPrice = await CalculatorService.getSulkyPrice(); //def: 0.01
    const goldPrice = await CalculatorService.getGoldPrice(); //def: 0.08
    const texPrice = await CalculatorService.getTexPrice(); //def: 0.08
    const multiplier = await CalculatorService.getMultiplier(); //def: 1
    const externalMultiplier = await CalculatorService.getExternalMultiplier(); //def: 2

    let category = await CalculatorService.getCategory();

    let categoryMultiplier = 1;
    if (category === 1){
      categoryMultiplier = 1.5;
    } else if (category === 2) {
      categoryMultiplier = externalMultiplier;
    }
    return (order.quantity * (
      basePrice +
      (order.stitches * normalPrice) +
      (order.stitchesSulky * sulkyPrice) +
      (order.stitchesGolden * goldPrice) +
      (order.stitchesTex * texPrice)
    )) * categoryMultiplier * multiplier;
  }


  public static async calculateShirtPrice(order: OrderDto): Promise<number> {
    const baseBroughtPrice = await CalculatorService.getBaseBroughtPrice(); //def: 500
    const normalPrice = await CalculatorService.getNormalPrice(); //def: 0.01
    const sulkyPrice = await CalculatorService.getSulkyPrice(); //def: 0.01
    const goldPrice = await CalculatorService.getGoldPrice(); //def: 0.08
    const texPrice = await CalculatorService.getTexPrice(); //def: 0.08
    const multiplier = await CalculatorService.getMultiplier(); //def: 1
    const externalMultiplier = await CalculatorService.getExternalMultiplier(); //def: 2

    let category = await CalculatorService.getCategory();
    let categoryMultiplier = 1;
    if (category === 1){
      categoryMultiplier = 1.5;
    } else if (category === 2) {
      categoryMultiplier = externalMultiplier;
    }

    return (order.quantity * (
      baseBroughtPrice +
      (order.stitches * normalPrice) +
      (order.stitchesSulky * sulkyPrice) +
      (order.stitchesGolden * goldPrice) +
      (order.stitchesTex * texPrice)
    )) * categoryMultiplier * multiplier;
  }

  public static async calculateBeaniePrice(order: OrderDto): Promise<number> {
    const baseBroughtPrice = await CalculatorService.getBaseBroughtPrice(); //def: 500
    const normalPrice = await CalculatorService.getNormalPrice(); //def: 0.01
    const sulkyPrice = await CalculatorService.getSulkyPrice(); //def: 0.01
    const goldPrice = await CalculatorService.getGoldPrice(); //def: 0.08
    const texPrice = await CalculatorService.getTexPrice(); //def: 0.08
    const multiplier = await CalculatorService.getMultiplier(); //def: 1
    const externalMultiplier = await CalculatorService.getExternalMultiplier(); //def: 2

    let category = await CalculatorService.getCategory();
    let categoryMultiplier = 1;
    if (category === 1){
      categoryMultiplier = 1.5;
    } else if (category === 2) {
      categoryMultiplier = externalMultiplier;
    }

    return (order.quantity * (
      baseBroughtPrice*0.75 +
      (order.stitches * normalPrice) +
      (order.stitchesSulky * sulkyPrice) +
      (order.stitchesGolden * goldPrice) +
      (order.stitchesTex * texPrice)
    )) * categoryMultiplier * multiplier;
  }

  public calculateOtherPrice(patchQuantity: number, patchDiameter: number, patchStitches: number, patchFancyStitches: number): number {

    return 0;
  }

  public static async round(num: number): Promise<number> {
    return Math.ceil(num / 100) * 100;
  }
  public static async roundAccurate(num: number): Promise<number> {
    return Math.round(num);
  }
}
