import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyFourComponent } from './home-uk-fourty-four/home-uk-fourty-four.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyFourComponent }];

@NgModule({
  declarations: [HomeUkFourtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFourUkArtickleModule {}
