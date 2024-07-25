import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-eight',
  templateUrl: './home-ru-blog-eight.component.html',
  styleUrl: './home-ru-blog-eight.component.scss',
})
export class HomeRuBlogEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Имбаланс в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Имбаланс в трейдинге что это и как использовать?',
    });
  }
}
