import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtySixComponent } from './home-uk-thirty-six/home-uk-thirty-six.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtySixComponent }];
@NgModule({
  declarations: [HomeUkThirtySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtySixUkArtickleModule {}
