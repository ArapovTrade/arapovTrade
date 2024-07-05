import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-three',
  templateUrl: './home-ru-three.component.html',
  styleUrl: './home-ru-three.component.scss',
})
export class HomeRuThreeComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Знакомство с биржей. Как устроена биржа.',
    });
  }
}
