import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-ru-blog-fifty-two',
  templateUrl: './home-ru-blog-fifty-two.component.html',
  styleUrl: './home-ru-blog-fifty-two.component.scss',
})
export class HomeRuBlogFiftyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Анатомия трендов на рынке - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Анатомия трендов на рынке | Объемный анализ рынка',
    });
  }
}
