import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru',
  templateUrl: './home-ru.component.html',
  styleUrl: './home-ru.component.scss',
})
export class HomeRuComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: '10 советов начинающим трейдерам от Игоря Арапова ',
    });
  }
}
