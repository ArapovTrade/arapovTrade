import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-three',
  templateUrl: './home-ru-blog-twenty-three.component.html',
  styleUrl: './home-ru-blog-twenty-three.component.scss',
})
export class HomeRuBlogTwentyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ликвидность в Трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Смарт Мани | Ликвидность в Трейдинге | Уровни Ликвидности',
    });
  }
}
