import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyEightComponent } from './home-uk-blog-eighty-eight/home-uk-blog-eighty-eight.component';


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyEightComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyEightUkBlogModule { }
