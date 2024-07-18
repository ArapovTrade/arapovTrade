import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtyFiveComponent } from './home-ru-fourty-five/home-ru-fourty-five.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtyFiveComponent }];

@NgModule({
  declarations: [HomeRuFourtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFiveRuArtickleModule {}
