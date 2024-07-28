import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourteen',
  templateUrl: './home-uk-blog-fourteen.component.html',
  styleUrl: './home-uk-blog-fourteen.component.scss',
})
export class HomeUkBlogFourteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Трейдинг та Інвестиції що краще? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Трейдинг та Інвестиції що краще? Плюси і мінуси',
    });
  }
}
