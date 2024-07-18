import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourtyFiveComponent } from './home-en-fourty-five/home-en-fourty-five.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourtyFiveComponent }];

@NgModule({
  declarations: [HomeEnFourtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFiveEnArtickleModule {}
