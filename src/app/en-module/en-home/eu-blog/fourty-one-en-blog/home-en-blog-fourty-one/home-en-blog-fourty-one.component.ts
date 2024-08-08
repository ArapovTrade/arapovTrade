import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourty-one',
  templateUrl: './home-en-blog-fourty-one.component.html',
  styleUrl: './home-en-blog-fourty-one.component.scss',
})
export class HomeEnBlogFourtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Rules for Successful Trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Simple Rules for Successful Trading | Logic of Liquidity',
    });
  }
}
