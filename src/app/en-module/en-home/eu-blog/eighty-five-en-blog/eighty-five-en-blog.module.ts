import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyFiveComponent } from './home-en-blog-eighty-five/home-en-blog-eighty-five.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyFiveComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyFiveEnBlogModule {}
