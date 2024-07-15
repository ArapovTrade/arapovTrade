import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyComponent } from './home-uk-fourty/home-uk-fourty.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyComponent }];
@NgModule({
  declarations: [HomeUkFourtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyUkArtickleModule {}
