import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyTwoComponent } from './home-uk-fourty-two/home-uk-fourty-two.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyTwoComponent }];

@NgModule({
  declarations: [HomeUkFourtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyTwoUkArtickleModule {}
