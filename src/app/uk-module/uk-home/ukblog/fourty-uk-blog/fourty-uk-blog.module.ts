import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyComponent } from './home-uk-blog-fourty/home-uk-blog-fourty.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyUkBlogModule {}
