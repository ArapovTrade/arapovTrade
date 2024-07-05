import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-five',
  templateUrl: './home-uk-five.component.html',
  styleUrl: './home-uk-five.component.scss',
})
export class HomeUkFiveComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: "Що таке ф'ючерси Деривативи та їх види",
    });
  }
}
