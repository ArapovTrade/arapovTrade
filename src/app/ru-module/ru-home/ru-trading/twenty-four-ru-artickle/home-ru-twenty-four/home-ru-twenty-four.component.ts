import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty-four',
  templateUrl: './home-ru-twenty-four.component.html',
  styleUrl: './home-ru-twenty-four.component.scss',
})
export class HomeRuTwentyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Экономическое состояние государства - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Экономика Государства ',
    });
  }
}
