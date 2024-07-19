import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fourty-two',
  templateUrl: './home-uk-fourty-two.component.html',
  styleUrl: './home-uk-fourty-two.component.scss',
})
export class HomeUkFourtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як заробити на Форекс - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Що таке таймфрейм у трейдингу?',
    });
  }
}
