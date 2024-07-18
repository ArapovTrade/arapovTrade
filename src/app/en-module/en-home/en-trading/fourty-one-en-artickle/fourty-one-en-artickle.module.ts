import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourtyOneComponent } from './home-en-fourty-one/home-en-fourty-one.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourtyOneComponent }];

@NgModule({
  declarations: [HomeEnFourtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyOneEnArtickleModule {}
