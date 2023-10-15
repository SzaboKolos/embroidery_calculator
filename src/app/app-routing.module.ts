import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCalculatorPageComponent } from './main-calculator-page/main-calculator-page.component';

const routes: Routes = [
  { path: 'himzoArgep', component: MainCalculatorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
