import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentySixComponent } from './home-en-twenty-six/home-en-twenty-six.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentySixComponent }];
@NgModule({
  declarations: [HomeEnTwentySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentySixEnArtickleModule {}
