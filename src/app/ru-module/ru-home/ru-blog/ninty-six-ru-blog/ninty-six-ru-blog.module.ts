import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintySixComponent } from './home-ru-blog-ninty-six/home-ru-blog-ninty-six.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintySixComponent }];

@NgModule({
  declarations: [HomeRuBlogNintySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintySixRuBlogModule { }
