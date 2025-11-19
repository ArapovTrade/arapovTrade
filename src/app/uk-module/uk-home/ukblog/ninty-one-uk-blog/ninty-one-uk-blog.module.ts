import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyOneComponent } from './home-uk-blog-ninty-one/home-uk-blog-ninty-one.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyOneUkBlogModule { }
