import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fifty-three',
  templateUrl: './home-ru-blog-fifty-three.component.html',
  styleUrl: './home-ru-blog-fifty-three.component.scss',
})
export class HomeRuBlogFiftyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ордер Блок в Трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ордер Блок в Трейдинге что это и как использовать?',
    });
  }
}
