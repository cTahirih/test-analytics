import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private router: Router, private heroService: HeroService, private gtm: GoogleTagManagerService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  onClickDetailHeroBtn(hero: Hero) {
    this.router.navigateByUrl('/detail/' + hero.id);
    this.sendTag(hero)
  }

  sendTag(hero: Hero) {
    this.gtm.pushTag({
      event: 'viewHeroDetail',
      content: {
        page: 'Top_Heroes',
        name: hero.name,
        id: hero.id,
        popularity: hero.popularity,
        adult: hero.adult,
      }
    })
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
