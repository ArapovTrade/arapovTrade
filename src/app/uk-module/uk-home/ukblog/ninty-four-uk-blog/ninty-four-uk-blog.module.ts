import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyFourComponent } from './home-uk-blog-ninty-four/home-uk-blog-ninty-four.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyFourComponent }];

@NgModule({
  declarations: [ HomeUkBlogNintyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyFourUkBlogModule { }
