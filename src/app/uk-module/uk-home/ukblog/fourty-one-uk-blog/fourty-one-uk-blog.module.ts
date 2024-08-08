import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyOneComponent } from './home-uk-blog-fourty-one/home-uk-blog-fourty-one.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyOneUkBlogModule {}
