import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOneComponent } from './home-uk-blog-one/home-uk-blog-one.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOneComponent }];

@NgModule({
  declarations: [HomeUkBlogOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OneUkBlogModule {}
