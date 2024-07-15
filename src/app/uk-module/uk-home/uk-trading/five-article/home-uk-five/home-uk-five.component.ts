import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-five',
  templateUrl: './home-uk-five.component.html',
  styleUrl: './home-uk-five.component.scss',
})
export class HomeUkFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Деривативи та їх види - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: "Що таке ф'ючерси. Деривативи та їх види",
    });
  }
}
