import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyFourComponent } from './home-uk-blog-thirty-four/home-uk-blog-thirty-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirtyFourComponent }];

@NgModule({
  declarations: [HomeUkBlogThirtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyFourUkBlogModule {}
