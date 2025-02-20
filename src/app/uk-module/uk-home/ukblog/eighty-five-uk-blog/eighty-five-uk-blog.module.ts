import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyFiveComponent } from './home-uk-blog-eighty-five/home-uk-blog-eighty-five.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyFiveUkBlogModule {}
