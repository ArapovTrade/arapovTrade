import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-uk-blog-ninty-one',
  templateUrl: './home-uk-blog-ninty-one.component.html',
  styleUrl: './home-uk-blog-ninty-one.component.scss'
})
export class HomeUkBlogNintyOneComponent implements OnInit  {
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
    

     this.themeSubscription =this.themeService.getTheme().subscribe(data=>{
      this.isDark=data;
        this.cdr.detectChanges();
    })
    
 this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;



   this.titleService.setTitle('Що таке тільт у трейдингу: причини, ознаки');
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, що таке тільт, його причини, ознаки, види (явний і прихований), а також ефективні способи боротьби та профілактики | Ігор Арапов',
    });

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

     

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }
  
  
  hoveredIndex: number | null = null;
  
  projects = [
    { title: 'Швидкий старт', link: 'https://arapov.education/ua/course-ua/' },
    { title: 'Вступ до трейдингу', link: 'https://arapov.education/ua/reg-workshop-ua/' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    { title: 'Базовий курс', link: 'https://arapov.trade/uk/freestudying/freeeducation' },
    { title: 'Копiтрейдинг', link: 'https://arapovcopytrade.com/ua/invest-ua/' },
  ];
  
  
  
   
    onGroupChange(event: Event) {
       
     
       const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    
      this.router.navigate(['/uk/freestudying'], {
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
      article.groupsUkr.forEach(group => {
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
      
       
       this.router.navigate(['/uk/freestudying', nextpage] )
      
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
      
         
       this.router.navigate(['/uk/freestudying', nextpage] )
    }
}

