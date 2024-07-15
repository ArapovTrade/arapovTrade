import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourtyComponent } from './home-en-fourty/home-en-fourty.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourtyComponent }];
@NgModule({
  declarations: [HomeEnFourtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyEnArtickleModule {}
