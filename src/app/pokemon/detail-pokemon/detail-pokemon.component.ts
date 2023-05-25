import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',

})
export class DetailPokemonComponent implements OnInit{

  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;
  pokemonId: string | null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
    
    this.pokemonId = this.route.snapshot.paramMap.get('id');
    if(this.pokemonId) {
      this.pokemonService.getPokemonById(+this.pokemonId).subscribe(in_pokemon => this.pokemon = in_pokemon);
    } 
    
  }


  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(() => this.goToPokemonList());
  }

  goToPokemonList() {
    this.router.navigate(['pokemon']);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
