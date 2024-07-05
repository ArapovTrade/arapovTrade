import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-three',
  templateUrl: './home-uk-three.component.html',
  styleUrl: './home-uk-three.component.scss',
})
export class HomeUkThreeComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Знайомство з біржею. Як улаштована біржа.',
    });
  }
}
