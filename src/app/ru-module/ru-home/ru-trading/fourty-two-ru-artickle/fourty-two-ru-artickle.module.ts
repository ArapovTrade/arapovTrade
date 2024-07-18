import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtyTwoComponent } from './home-ru-fourty-two/home-ru-fourty-two.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtyTwoComponent }];

@NgModule({
  declarations: [HomeRuFourtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyTwoRuArtickleModule {}
