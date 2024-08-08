import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyNineComponent } from './home-uk-blog-fourty-nine/home-uk-blog-fourty-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyNineUkBlogModule {}
