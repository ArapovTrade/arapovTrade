import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyFiveComponent } from './home-uk-blog-fourty-five/home-uk-blog-fourty-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFiveUkBlogModule {}
