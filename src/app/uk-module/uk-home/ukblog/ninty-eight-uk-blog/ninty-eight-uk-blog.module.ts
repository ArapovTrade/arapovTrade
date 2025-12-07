import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyEightComponent } from './home-uk-blog-ninty-eight/home-uk-blog-ninty-eight.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyEightComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyEightUkBlogModule { }
