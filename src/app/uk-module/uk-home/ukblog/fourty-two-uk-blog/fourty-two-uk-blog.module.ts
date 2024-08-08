import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyTwoComponent } from './home-uk-blog-fourty-two/home-uk-blog-fourty-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyTwoUkBlogModule {}
