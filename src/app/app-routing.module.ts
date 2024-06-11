import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCalculatorPageComponent } from './main-calculator-page/main-calculator-page.component';
import { HouseSwatchComponent } from './house-swatch/house-swatch.component';

const routes: Routes = [
  { path: 'himzoArgep', component: MainCalculatorPageComponent },
  { path: 'houseSwatches', component: HouseSwatchComponent },
  { path: '**', redirectTo: 'himzoArgep' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
