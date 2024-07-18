import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourtyFourComponent } from './home-en-fourty-four/home-en-fourty-four.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourtyFourComponent }];

@NgModule({
  declarations: [HomeEnFourtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFourEnArtickleModule {}
