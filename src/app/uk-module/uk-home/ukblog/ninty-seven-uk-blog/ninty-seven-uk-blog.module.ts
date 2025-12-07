import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintySevenComponent } from './home-uk-blog-ninty-seven/home-uk-blog-ninty-seven.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintySevenComponent }];

@NgModule({
  declarations: [HomeUkBlogNintySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintySevenUkBlogModule { }
