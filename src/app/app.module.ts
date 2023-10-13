import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainCalculatorPageComponent } from './main-calculator-page/main-calculator-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';


import { PatchTypeComponent } from './types/patch-type/patch-type.component';
import { ShirtTypeComponent } from './types/shirt-type/shirt-type.component';
import { SweaterTypeComponent } from './types/sweater-type/sweater-type.component';
import { OtherTypeComponent } from './types/other-type/other-type.component';
import { SettingsPatchComponent } from './settings/settings-patch/settings-patch.component';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
 

@NgModule({
  declarations: [
    AppComponent,
    MainCalculatorPageComponent,
    PatchTypeComponent,
    ShirtTypeComponent,
    SweaterTypeComponent,
    OtherTypeComponent,
    SettingsPatchComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
     MatCheckboxModule,
      MatButtonModule, 
      MatFormFieldModule,
       MatDatepickerModule,
        MatRadioModule,
         MatInputModule,
          MatSelectModule, 
          MatSlideToggleModule, 
          MatCardModule,
          MatTabsModule,
          MatGridListModule,
          MatExpansionModule,
          MatIconModule,
          ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
