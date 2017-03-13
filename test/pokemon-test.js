'use strict';

const expect = require('chai').expect;
const Pokemon = require('../model/pokemon.js');

describe('Testing the pokemon model', function(){
  it('should create a new pokemon object', function(){
    let testPokemon = {
      name:'Bulbasuar',
      type: 'Grass',
      moves: '"cut", "pound", "solarbeam"',
      pokedexNUM: 1,
    };
    let tempPokemon = new Pokemon(testPokemon);
    expect(tempPokemon.name).to.equal(testPokemon.name);
    expect(tempPokemon.type).to.equal(testPokemon.type);

  });
});
