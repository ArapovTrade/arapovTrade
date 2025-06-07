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
    this.titleService.setTitle('Безкоштовне навчання трейдингу — курс Ігоря Арапова');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Безкоштовний курс з трейдингу Ігоря Арапова: 130 + статей і 70 відео. Вивчайте теханаліз, ризик-менеджмент і торгові стратегії онлайн",
    });

    this.meta.addTag( {
       name:'keywords',
       content:'трейдинг, навчання трейдингу, технічний аналіз, фінансова біржа, торгова система, Ігор Арапов'
    })
   
    this.meta.updateTag({ name: 'datePublished', content: '2025-06-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'assets/img/photo_mainpage.jpg',
    });
  }
}
