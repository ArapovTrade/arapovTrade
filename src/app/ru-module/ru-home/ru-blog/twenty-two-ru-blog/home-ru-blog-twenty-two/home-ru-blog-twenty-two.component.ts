import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-two',
  templateUrl: './home-ru-blog-twenty-two.component.html',
  styleUrl: './home-ru-blog-twenty-two.component.scss',
})
export class HomeRuBlogTwentyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ценовые фигуры в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Про ценовые фигуры в трейдинге',
    });
  }
}
