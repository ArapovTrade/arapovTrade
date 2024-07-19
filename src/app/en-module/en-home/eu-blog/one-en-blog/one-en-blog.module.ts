import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOneComponent } from './home-en-blog-one/home-en-blog-one.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOneComponent }];

@NgModule({
  declarations: [HomeEnBlogOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OneEnBlogModule {}
