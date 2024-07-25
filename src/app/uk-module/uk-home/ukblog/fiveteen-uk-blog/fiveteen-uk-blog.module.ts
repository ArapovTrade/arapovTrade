import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiveteenComponent } from './home-uk-blog-fiveteen/home-uk-blog-fiveteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiveteenComponent }];

@NgModule({
  declarations: [HomeUkBlogFiveteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiveteenUkBlogModule {}
