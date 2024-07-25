import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiveteenComponent } from './home-ru-blog-fiveteen/home-ru-blog-fiveteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiveteenComponent }];

@NgModule({
  declarations: [HomeRuBlogFiveteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiveteenRuBlogModule {}
