import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtySixComponent } from './home-ru-fourty-six/home-ru-fourty-six.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtySixComponent }];

@NgModule({
  declarations: [HomeRuFourtySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtySixRuArtickleModule {}
