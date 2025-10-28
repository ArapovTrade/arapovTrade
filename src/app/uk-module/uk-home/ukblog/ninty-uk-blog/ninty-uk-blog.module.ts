import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyComponent } from './home-uk-blog-ninty/home-uk-blog-ninty.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyUkBlogModule { }
