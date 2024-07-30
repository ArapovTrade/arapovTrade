import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-three',
  templateUrl: './home-en-blog-twenty-three.component.html',
  styleUrl: './home-en-blog-twenty-three.component.scss',
})
export class HomeEnBlogTwentyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Liquidity in Trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Smart Money | Liquidity in Trading | Liquidity Levels',
    });
  }
}
