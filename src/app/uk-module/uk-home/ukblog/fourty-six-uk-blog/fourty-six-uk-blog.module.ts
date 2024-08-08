import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtySixComponent } from './home-uk-blog-fourty-six/home-uk-blog-fourty-six.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtySixComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtySixUkBlogModule {}
