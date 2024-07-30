import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyComponent } from './home-uk-blog-thirty/home-uk-blog-thirty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirtyComponent }];

@NgModule({
  declarations: [HomeUkBlogThirtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyUkBlogModule {}
