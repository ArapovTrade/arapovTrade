import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyEightComponent } from './home-uk-blog-fourty-eight/home-uk-blog-fourty-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogFourtyEightComponent },
];

@NgModule({
  declarations: [HomeUkBlogFourtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyEightUkBlogModule {}
