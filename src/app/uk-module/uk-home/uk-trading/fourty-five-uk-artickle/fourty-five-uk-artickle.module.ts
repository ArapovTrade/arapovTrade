import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyFiveComponent } from './home-uk-fourty-five/home-uk-fourty-five.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyFiveComponent }];

@NgModule({
  declarations: [HomeUkFourtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFiveUkArtickleModule {}
