import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-three',
  templateUrl: './home-ru-thirty-three.component.html',
  styleUrl: './home-ru-thirty-three.component.scss',
})
export class HomeRuThirtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Реквоты - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Реквоты в трейдинге ',
    });
  }
}
