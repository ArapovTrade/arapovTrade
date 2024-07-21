import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiveComponent } from './home-uk-blog-five/home-uk-blog-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiveUkBlogModule {}
