import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-ten',
  templateUrl: './home-uk-ten.component.html',
  styleUrl: './home-uk-ten.component.scss',
})
export class HomeUkTenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Біржова угода. Поняття, види та типи',
    });
  }
}
