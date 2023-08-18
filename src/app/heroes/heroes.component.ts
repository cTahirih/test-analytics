import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private gtm: GoogleTagManagerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  onClickDetailHeroBtn(hero: Hero) {
    this.router.navigateByUrl('/detail/' + hero.id);
    this.sendTag(hero)
  }

  sendTag(hero: Hero) {
    this.gtm.pushTag({
      event: 'viewHeroDetail',
      content: {
        page: 'My_Heroes',
        name: hero.name,
        id: hero.id
      }
    })
  }
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
