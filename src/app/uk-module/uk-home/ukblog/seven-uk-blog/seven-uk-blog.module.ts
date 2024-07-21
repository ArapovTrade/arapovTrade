import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSevenComponent } from './home-uk-blog-seven/home-uk-blog-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSevenComponent }];

@NgModule({
  declarations: [HomeUkBlogSevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SevenUkBlogModule {}
