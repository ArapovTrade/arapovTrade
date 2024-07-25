import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFiveteenComponent } from './home-en-blog-fiveteen/home-en-blog-fiveteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFiveteenComponent }];

@NgModule({
  declarations: [HomeEnBlogFiveteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiveteenEnBlogModule {}
