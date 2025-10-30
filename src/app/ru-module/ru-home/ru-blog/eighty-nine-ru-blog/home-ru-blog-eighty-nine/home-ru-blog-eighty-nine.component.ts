import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-ru-blog-eighty-nine',
  templateUrl: './home-ru-blog-eighty-nine.component.html',
  styleUrl: './home-ru-blog-eighty-nine.component.scss'
})
export class HomeRuBlogEightyNineComponent implements OnInit{
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
       private cdr:ChangeDetectorRef,
  private router: Router,
    private themeService:ThemeservService,

  ) {}

  private routerSubscription!: Subscription;
 private themeSubscription!: Subscription;
  isDark!:boolean  ;
  ukrGroups: any = [];
 grr!: any;
  checkedGroup!: any;

  ngOnInit(): void {
    this.titleService.setTitle('Что такое доминация биткоина (BTC.D) и как она влияет на рынок криптовалют | Игорь Арапов');
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое доминация биткоина (BTC.D), зачем следить за этим показателем и как доминирование BTC влияет на рынок криптовалют и альткоины. Простое объяснение для начинающих трейдеров.',
    });

     this.themeSubscription =this.themeService.getTheme().subscribe(data=>{
      this.isDark=data;
        this.cdr.detectChanges();
    })
    
 this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;



    // this.titleService.setTitle('Що таке імбаланс у трейдингу | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // this.meta.updateTag({
    //   name: 'description',
    //   content:
    //     'Що таке імбаланс у трейдингу, як він впливає на ринок. Приклади, методи виявлення і стратегії з урахуванням ринкового дисбалансу.',
    // });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }
  
  
  hoveredIndex: number | null = null;
  
  projects = [
  { title: 'Быстрый старт', link: 'https://arapov.education/course/' },
  { title: 'Введение в трейдинг', link: 'https://arapov.education/reg-workshop/' },
  { title: 'Профессиональные курсы', link: 'https://arapov.trade/ru/studying' },
  { title: 'Базовый курс', link: 'https://arapov.trade/ru/freestudying/freeeducation' },
  { title: 'Копитрейдинг', link: 'https://arapovcopytrade.com' },
];
  
  
  
   
    onGroupChange(event: Event) {
       
     
       const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    
      this.router.navigate(['/ru/freestudying'], {
      queryParams: { group: value }
    });
     
   
    
    this.checkedGroup = this.artickleServ.selectedGroups;
    
    }
    paginatedArticles = []; // Статьи для отображения на текущей странице
    currentPage = 0;
    pageSize = 10;
     
  
     
         ngOnDestroy() {
          // Отписка от подписок
          if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
          }
          if (this.themeSubscription) {
            this.themeSubscription.unsubscribe();
          }
        } 
        hovered: string | null = null;
        toggleTheme() {
        this.isDark = !this.isDark;
        this.themeService.setTheme(this.isDark)
         
         
    
    
      }
    
       
       
      navigateTo(path: string) {
        this.router.navigate([path]);
      }
  
  
  
      articleCounts: { [key: string]: number } = {};
      updateArticleCounts() {
    this.articleCounts = {}; // очищаем
  
    this.artickleServ.ukrArtickles.forEach(article => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsRus.forEach(group => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
    //popup
    flag1: boolean = false;
    flagTrue1: boolean = true;
    searchtoggle(event: Event) {
      this.flag1 = !this.flag1;
      this.flagTrue1 = !this.flagTrue1;
    }
  
  
  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';
  
  onFocus() {
    this.isFocused = true;
  
    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(() => Math.random() - 0.5);
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }
  
  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }
  
  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter(a =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }
  
  moveToTheTop(){
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  groupsMenuOpen = false;
     toggleGroupsMenu(event: Event) {
      
      this.groupsMenuOpen = !this.groupsMenuOpen;
    }

    goToNextPage(){
      let nextpage:any;
      const path:string=this.router.url.split('/')[this.router.url.split('/').length-1];
      let index=this.artickleServ.ukrArtickles.findIndex(a=>a.linkUkr==path);
     
      if(this.artickleServ.ukrArtickles.length-1==index){
      nextpage=this.artickleServ.ukrArtickles[0].linkUkr;
      }else{
        nextpage=this.artickleServ.ukrArtickles[index+1].linkUkr;
      }
      
       
       this.router.navigate(['/ru/freestudying', nextpage] )
      
    }



    goToPreviousPage(){
      let nextpage:any;
      const path:string=this.router.url.split('/')[this.router.url.split('/').length-1];
      let index=this.artickleServ.ukrArtickles.findIndex(a=>a.linkUkr==path);
     
      if(index==1){
      nextpage=this.artickleServ.ukrArtickles[this.artickleServ.ukrArtickles.length-1].linkUkr;
      }else{
        nextpage=this.artickleServ.ukrArtickles[index-1].linkUkr;
      }
      
         
       this.router.navigate(['/ru/freestudying', nextpage] )
    }
}

