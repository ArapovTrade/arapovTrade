import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyOneComponent } from './home-uk-fourty-one/home-uk-fourty-one.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyOneComponent }];

@NgModule({
  declarations: [HomeUkFourtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyOneUkArtickleModule {}
