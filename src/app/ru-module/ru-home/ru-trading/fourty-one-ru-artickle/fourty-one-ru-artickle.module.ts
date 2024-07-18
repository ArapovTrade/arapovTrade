import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtyOneComponent } from './home-ru-fourty-one/home-ru-fourty-one.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtyOneComponent }];

@NgModule({
  declarations: [HomeRuFourtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyOneRuArtickleModule {}
