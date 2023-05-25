import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    let text = 'getList'
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(text,response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    let text = 'get'
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`, ).pipe(
      tap((response) => this.log(text, response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }


  updatePokemon(pokemon: Pokemon): Observable<null> {
    let text = 'update'
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response:any) => this.log(text, response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    let text = 'delete'
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response: any) => this.log(text,response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    let text = 'add'
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(text, response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    let text = 'search'
    if(term.length <= 1) {
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(text,response)), 
      catchError((error) => this.handleError(error, undefined))
      );
  }

  private log(text: string, response: Pokemon[]|Pokemon|undefined | null) {
    console.log(text, response);
  }

  private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  } 

  getPokemonTypeList(): string[] {
    return [
      'Plante', 
      'Feu', 
      'Eau', 
      'Insecte', 
      'Normal',
      'Electrik', 
      'Poison', 
      'Fée', 
      'Vol', 
      'Combat', 
     'Psy'
    ];
  }
}
