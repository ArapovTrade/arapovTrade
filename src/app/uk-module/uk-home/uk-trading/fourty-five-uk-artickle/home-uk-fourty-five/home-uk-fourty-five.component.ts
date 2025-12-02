import { Component, OnInit, Inject, signal ,ChangeDetectorRef} from '@angular/core';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home-uk-fourty-five',
  templateUrl: './home-uk-fourty-five.component.html',
  styleUrl: './home-uk-fourty-five.component.scss',
})
export class HomeUkFourtyFiveComponent implements OnInit {
  readonly panelOpenState = signal(false);
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private cdr:ChangeDetectorRef,
  private router: Router,
    private themeService:ThemeservService,
    private artickleServ: ArticlesService,
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
    this.removeExistingWebPageSchema()

    this.titleService.setTitle(
      'Безкоштовне навчання трейдингу для початківців | Ігор Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Безкоштовний курс з трейдингу: 130+ статей та 70 відеоуроків. Вивчіть основи, аналіз, психологію торгівлі та перевірені стратегії',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-05-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/content/freeeducationnew.webp',
    });
     this.meta.updateTag({
          name: 'twitter:image',
          content: `https://arapov.trade/assets/img/content/freeeducationnew.webp`,
        });
    this.addJsonLdScript();
    this.addCourseSchema()
      this.addVideoObjectSchema();
this.addArtickleSchema()

    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = this.document.getElementById(fragment);
          if (element) {
            // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
            const offset = 80;

            // Позиция элемента относительно страницы
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Скроллим с учётом отступа
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    });
  }

  private addJsonLdScript(): void {
    const jsonLdScript = this.document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Як пройти безкоштовний курс із трейдингу від Ігоря Арапова',
      description:
        'Покрокова інструкція для самостійного проходження безкоштовного онлайн-курсу трейдингу.',
      author: { '@type': 'Person', name: 'Ігор Арапов' },
      publisher: {
        '@type': 'Organization',
        name: 'Ігор Арапов',
        logo: {
          '@type': 'ImageObject',
          url: 'https://arapov.trade/favicon.ico',
        },
      },
      license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/uk/freestudying/freeeducation'
      },
      step: [
        {
          '@type': 'HowToStep',
          name: 'Ознайомтеся з програмою курсу',
          text: 'Перейдіть до розділу «Програма курсу» та вивчіть, з чого складається навчання.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section1',
        },
        {
          '@type': 'HowToStep',
          name: 'Пройдіть модуль «Трейдинг для початківців»',
          text: 'Розберіться з базовими поняттями та основами біржової торгівлі.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section2',
        },
        {
          '@type': 'HowToStep',
          name: 'Вивчіть технічний аналіз',
          text: 'Опанувати базові патерни поведінки ціни, фігури розвороту, рівні.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section3',
        },
        {
          '@type': 'HowToStep',
          name: 'Поглибіться в об’ємний аналіз',
          text: 'Навчіться читати біржові обсяги та познайомтеся з концепцією Річарда Вайкоффа.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section4',
        },
        {
          '@type': 'HowToStep',
          name: 'Опанувати стратегію Smart Money',
          text: 'Дізнайтесь, як працюють великі учасники ринку та як слідувати за ними.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section5',
        },
        {
          '@type': 'HowToStep',
          name: 'Вивчіть психологію трейдингу',
          text: 'Розберіться, як контролювати емоції та мислити як професіонал.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section6',
        },
        {
          '@type': 'HowToStep',
          name: 'Проаналізуйте торгові приклади',
          text: 'Розбір угод допоможе зрозуміти, як застосовувати теорію на практиці.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section9',
        },
        {
          '@type': 'HowToStep',
          name: 'Ознайомтеся з часто заданими питаннями',
          text: 'Відповіді на поширені питання щодо курсу та трейдингу.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section11',
        },
        {
          '@type': 'HowToStep',
          name: 'Підведіть підсумки курсу',
          text: 'Зробіть для себе ключові висновки та підготуйтеся до самостійної торгівлі.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section10',
        },
      ],
    });
    this.document.head.appendChild(jsonLdScript);
  }
  private addVideoObjectSchema() {
  // Проверяем, существует ли уже такой VideoObject
  const exists = Array.from(
    this.document.querySelectorAll('script[type="application/ld+json"]')
  ).some(script => {
    try {
      const json = JSON.parse(script.textContent || '{}');
      return json["@type"] === "VideoObject" &&
             json["name"] === "Безкоштовний курс з трейдингу — огляд програми";
    } catch {
      return false;
    }
  });

  if (exists) return;

  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Безкоштовний курс з трейдингу — огляд програми",
    "description": "Детальний розбір безкоштовного курсу з трейдингу: на що звертати увагу, навіщо потрібні різні розділи та які ключові теми в них розкриваються.",
    "thumbnailUrl": "https://img.youtube.com/vi/ZHhJqYzyaO4/maxresdefault.jpg",
    "uploadDate": "2024-01-15",
    "duration": "PT15M",
    "contentUrl": "https://www.youtube.com/watch?v=ZHhJqYzyaO4",
    "embedUrl": "https://www.youtube.com/embed/ZHhJqYzyaO4",
    "author": {
      "@type": "Person",
      "name": "Ігор Арапов"
    }
  });

  this.document.head.appendChild(script);
}


  private addArtickleSchema() {
  // Проверяем, существует ли уже такой ItemList
  const exists = Array.from(
    this.document.querySelectorAll('script[type="application/ld+json"]')
  ).some(script => {
    try {
      const json = JSON.parse(script.textContent || '{}');
      return json["@type"] === "ItemList" &&
             json["name"] === "Розділи курсу з трейдингу";
    } catch {
      return false;
    }
  });

  if (exists) return;

  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Розділи курсу з трейдингу",
    "description": "Структура безкоштовного курсу з трейдингу для початківців",
    "numberOfItems": 6,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Трейдинг для початківців",
        "description": "Основи професії, міфи про трейдинг, типові помилки новачків"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Технічний аналіз ринку",
        "description": "Фази ринку, тренди, рівні підтримки та опору, розворотні моделі"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Об’ємний аналіз",
        "description": "Вертикальний і горизонтальний об’єм, метод Вайкоффа, принцип зусилля-результат"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Smart Money",
        "description": "Концепція розумних грошей, маніпуляції великих гравців, ліквідність"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Психологія трейдингу",
        "description": "Страх і жадібність, дисципліна, мислення професійного трейдера"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Практика та приклади угод",
        "description": "Торгова система, розрахунок позиції, ризик-менеджмент, приклади входів"
      }
    ]
  });

  this.document.head.appendChild(script);
}


  private addCourseSchema(): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://arapov.trade/uk/freestudying/freeeducation#section1',
      url: 'https://arapov.trade/uk/freestudying/freeeducation',
      name: 'Безкоштовний курс із трейдингу від Ігоря Арапова',
      description:
        'Безкоштовний курс із трейдингу: 130+ статей та 70 відеоуроків. Вивчіть основи, аналіз, психологію торгівлі та перевірені стратегії',
      inLanguage: 'uk',
      mainEntity: { '@id': 'https://arapov.trade/uk/studying' },
    });
    this.document.head.appendChild(script);
  }
   

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'WebPage') {
          script.remove();
        }
        if (content['@type'] === 'HowTo') {
          script.remove();
        }
         
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
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
      let index=1;
       
      if(index==1){
      nextpage=this.artickleServ.ukrArtickles[this.artickleServ.ukrArtickles.length-1].linkUkr;
      }else{
        nextpage=this.artickleServ.ukrArtickles[index-1].linkUkr;
      }
      
         
       this.router.navigate(['/uk/freestudying', nextpage] )
    }
}
