import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl('');

  public heroes: Hero[] = [];

  public selectedHero?: Hero;

  public filteredOptions?: Observable<string[]>;
  constructor(
    private heroesService: HeroesService
  ) {

  }

  ngOnInit(): void {
    // this.filteredOptions = this.searchInput.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
  }

  searchHero() {

    const value: string = this.searchInput.value || '';
    console.log('wea val');
    console.log(value)
    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);

    console.log(value);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    if (!event.option.value) {
      this.selectedHero = undefined
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }

  private _filter(value: string): Hero[] {
    const filterValue = value.toLowerCase();

    return this.heroes.filter(option => option.superhero.toLowerCase().includes(filterValue));
  }

}
