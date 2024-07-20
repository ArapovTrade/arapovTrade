import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-five',
  templateUrl: './home-ru-thirty-five.component.html',
  styleUrl: './home-ru-thirty-five.component.scss',
})
export class HomeRuThirtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Торговая система - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Торговая система трейдера , зачем нужна?',
    });
  }
}
