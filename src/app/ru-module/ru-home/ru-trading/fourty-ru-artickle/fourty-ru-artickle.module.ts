import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtyComponent } from './home-ru-fourty/home-ru-fourty.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtyComponent }];
@NgModule({
  declarations: [HomeRuFourtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyRuArtickleModule {}
