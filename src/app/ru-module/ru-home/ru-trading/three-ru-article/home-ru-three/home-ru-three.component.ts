import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-three',
  templateUrl: './home-ru-three.component.html',
  styleUrl: './home-ru-three.component.scss',
})
export class HomeRuThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Знакомство с биржей и как она устроена - Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Знакомство с биржей. Как устроена биржа.',
    });
  }
}
