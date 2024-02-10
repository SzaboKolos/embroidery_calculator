import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { PricesDTO } from "../models/prices-dto";
import {OrderDto} from "../models/order-dto";
@Injectable({
    providedIn: 'root',
  })
export class CalculatorService{
    isInternal$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    basePrice$: BehaviorSubject<number> = new BehaviorSubject(200);
    basePatchDiameterPrice$: BehaviorSubject<number> = new BehaviorSubject(150);
    baseStitchPrice$: BehaviorSubject<number> = new BehaviorSubject(1);
    baseStitchSulkyPrice$: BehaviorSubject<number> = new BehaviorSubject(1);
    baseStitchGoldPrice$: BehaviorSubject<number> = new BehaviorSubject(8);
    baseStitchTexPrice$: BehaviorSubject<number> = new BehaviorSubject(8);

    multiplier$: BehaviorSubject<number> = new BehaviorSubject(1);
    externalMultiplier$: BehaviorSubject<number> = new BehaviorSubject(1.35);

    isInternal = this.isInternal$.asObservable();
    basePrice = this.basePrice$.asObservable();
    basePatchDiameterPrice= this.basePatchDiameterPrice$.asObservable();
    baseStitchPrice= this.baseStitchPrice$.asObservable();
    baseStitchSulkyPrice = this.baseStitchSulkyPrice$.asObservable();
    baseStitchGoldPrice = this.baseStitchGoldPrice$.asObservable();
    baseStitchTexPrice = this.baseStitchTexPrice$.asObservable();

    multiplier = this.multiplier$.asObservable();
    externalMultiplier = this.externalMultiplier$.asObservable();

    setInternal(bool: boolean){
        this.isInternal$.next(bool);
    }

    setPricesByDTO(pricesDTO: PricesDTO){
        this.basePrice$.next(pricesDTO.price);
        this.basePatchDiameterPrice$.next(pricesDTO.patchDiameterPrice);

        this.baseStitchPrice$.next(pricesDTO.stitchPrice);
        this.baseStitchSulkyPrice$.next(pricesDTO.stitchSulkyPrice);
        this.baseStitchGoldPrice$.next(pricesDTO.stitchGoldPrice);
        this.baseStitchTexPrice$.next(pricesDTO.stitchTexPrice);

        this.multiplier$.next(pricesDTO.multiplier);
        this.externalMultiplier$.next(pricesDTO.externalMultiplier);

        // saves prices to localstorage for later use
        localStorage.setItem('pricesDTO', JSON.stringify(pricesDTO));
    }

    async getInternal(): Promise<boolean>{
        const result = await firstValueFrom(this.isInternal).then((bool: boolean)=> {return bool;})
        return result;
    }
    async getMultiplier(): Promise<number>{
        const result = await firstValueFrom(this.multiplier).then((num: number)=> {return num;})
        return result;
    }
    async getBasePrice(): Promise<number>{
        const result = await firstValueFrom(this.basePrice).then((price: number)=> {return price;})
        return result;
    }

    async getPatchDiameter(): Promise<number>{
        const result = await firstValueFrom(this.basePatchDiameterPrice).then((price: number)=> {return price;})
        return result;
    }
    async getNormalPrice(): Promise<number>{
        const result = await firstValueFrom(this.baseStitchPrice).then((price: number)=> {return price/100;})
        return result;
    }
    async getSulkyPrice(): Promise<number>{
        const result = await firstValueFrom(this.baseStitchSulkyPrice).then((price: number)=> {return price/100;})
        return result;
    }
    async getGoldPrice(): Promise<number>{
        const result = await firstValueFrom(this.baseStitchGoldPrice).then((price: number)=> {return price/100;})
        return result;
    }
    async getTexPrice(): Promise<number>{
        const result = await firstValueFrom(this.baseStitchTexPrice).then((price: number)=> {return price/100;})
        return result;
    }

    async getExternalMultiplier(): Promise<number>{
        const result = await firstValueFrom(this.externalMultiplier).then((price: number)=> {return price;})
        return result;
    }

    public async calculatePatchPrice(order: OrderDto): Promise<number>
    {
      let patchDiameterPrice = 0;
      await this.getPatchDiameter().then(val => {patchDiameterPrice = val});
      switch(true){
          case (order.diameter <= 5): await this.getPatchDiameter().then(val => {patchDiameterPrice = val});                                                         break;
          case (order.diameter > 5 && order.diameter <= 10): await this.getPatchDiameter().then( val => {patchDiameterPrice = val*3});                          break;
          case (order.diameter >= 10): await this.getPatchDiameter().then( val => {patchDiameterPrice = val*3 + (order.diameter*10)});                          break;
      }
      let price = ( ((order.quantity) * ( (patchDiameterPrice) +
                              (order.stitches * await this.getNormalPrice() ) +
                              (order.stitchesSulky * await this.getSulkyPrice()) +
                              (order.stitchesGolden * await this.getGoldPrice() ) +
                              (order.stitchesTex * await this.getTexPrice() ) +
                              (order.dueDateInDays <= 7 ? ((8-order.dueDateInDays) * 500) : 0))) );

      return price * (await this.getInternal() ? 1 : await this.getExternalMultiplier()) * await this.getMultiplier();
    }


    public async calculateShirtPrice(order: OrderDto): Promise<number>
    {

      let price = ( ((order.quantity) *
        (order.stitches * await this.getNormalPrice() ) +
        (order.stitchesSulky * await this.getSulkyPrice()) +
        (order.stitchesGolden * await this.getGoldPrice() ) +
        (order.stitchesTex * await this.getTexPrice() ) +
        (order.dueDateInDays <= 7 ? ((8-order.dueDateInDays) * 500) : 0)) );

      return price * (await this.getInternal() ? 1 : await this.getExternalMultiplier()) * await this.getMultiplier();
    }

    public calculateSweaterPrice(patchQuantity: number, patchDiameter: number, patchStitches: number, patchFancyStitches: number): number
    {

        return 0;
    }

    public calculateOtherPrice(patchQuantity: number, patchDiameter: number, patchStitches: number, patchFancyStitches: number): number
    {

        return 0;
    }

}
