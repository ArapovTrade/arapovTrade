import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-three',
  templateUrl: './home-ru-blog-three.component.html',
  styleUrl: './home-ru-blog-three.component.scss',
})
export class HomeRuBlogThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Волатильность в трейдинге  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Волатильность в трейдинге - что это и как использовать?',
    });
  }
}
