import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { PricesDTO } from "../modules/prices-dto";
@Injectable({
    providedIn: 'root',
  })
export class CalculatorService{
    isInternal$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    basePrice$: BehaviorSubject<number> = new BehaviorSubject(400);
    basePatchDiameterPrice$: BehaviorSubject<number> = new BehaviorSubject(400);
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

    public async calculatePatchPrice(isInternalOrder: boolean, patchQuantity: number = 0, patchDiameter: number = 0, patchStitches: number = 0, patchStitchesSulky: number = 0, patchStitchesGolden: number = 0, patchStitchesTex: number = 0, dueDateInDays: number): Promise<number>
    {
        let patchDiameterPrice = 0;
        await this.getPatchDiameter().then(val => {patchDiameterPrice = val});
        let price = 0;
            switch(true){
                case (patchDiameter <= 5): await this.getPatchDiameter().then(val => {patchDiameterPrice = val});   break;
                case (patchDiameter > 5 && patchDiameter <= 7): patchDiameterPrice = 500;                           break;
                case (patchDiameter > 7 && patchDiameter <= 10): patchDiameterPrice = 600;                          break;
                case (patchDiameter >= 10): patchDiameterPrice = 600 + (patchDiameter*10);                          break;
            }
            price = ( await this.getBasePrice() + ((patchQuantity) * ( (patchDiameterPrice) + 
                                    (patchStitches * await this.getNormalPrice() ) + 
                                    (patchStitchesSulky * await this.getSulkyPrice()) +
                                    (patchStitchesGolden * await this.getGoldPrice() ) +
                                    (patchStitchesTex * await this.getTexPrice() ) +
                                    (dueDateInDays <= 7 ? ((8-dueDateInDays) * 500) : 0))) );
                                                                                 
        return price * (await this.getInternal() ? 1 : await this.getExternalMultiplier()) * await this.getMultiplier();
    }
    

    public calculateShirtPrice(patchQuantity: number, patchDiameter: number, patchStitches: number, patchFancyStitches: number): number
    {
    
        return 0;
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