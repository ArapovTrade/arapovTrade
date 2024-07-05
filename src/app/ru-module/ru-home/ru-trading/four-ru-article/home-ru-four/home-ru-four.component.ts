import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-four',
  templateUrl: './home-ru-four.component.html',
  styleUrl: './home-ru-four.component.scss',
})
export class HomeRuFourComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Биржевой и внебиржевой рынок. Что это и в чем отличие?',
    });
  }
}
