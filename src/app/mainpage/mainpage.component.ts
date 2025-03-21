import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent implements OnInit{
constructor(private meta: Meta,
  private titleService: Title,){}

  ngOnInit(){
    this.titleService.setTitle('Навчання трейдингу з нуля - Методичний посібник від Ігоря Арапова');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Методичний посібник для початківців у трейдингу: основи трейдингу, технічний аналіз, психологія ринку та торгова система від Ігоря Арапова.",
    });

    this.meta.addTag( {
       name:'keywords',
       content:'трейдинг, навчання трейдингу, технічний аналіз, фінансова біржа, торгова система, Ігор Арапов'
    })
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'assets/img/photo_mainpage.jpg',
    });
  }
}
