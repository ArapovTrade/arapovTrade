import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-fourty-six',
  templateUrl: './home-ru-fourty-six.component.html',
  styleUrl: './home-ru-fourty-six.component.scss',
})
export class HomeRuFourtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основные причины потери денег на бирже - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как не потерять деньги в трейдинге?',
    });
  }
}
