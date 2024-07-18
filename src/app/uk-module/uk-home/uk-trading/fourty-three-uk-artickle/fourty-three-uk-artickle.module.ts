import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyThreeComponent } from './home-uk-fourty-three/home-uk-fourty-three.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyThreeComponent }];

@NgModule({
  declarations: [HomeUkFourtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyThreeUkArtickleModule {}
