import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fourty-three',
  templateUrl: './home-uk-fourty-three.component.html',
  styleUrl: './home-uk-fourty-three.component.scss',
})
export class HomeUkFourtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як обрати таймфрейм для торгівлі на біржі - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як вибрати робочий таймфрейм для роботи на біржі?',
    });
  }
}
