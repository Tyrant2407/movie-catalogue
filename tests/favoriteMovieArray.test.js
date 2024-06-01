import { afterEach, describe, it } from '@jest/globals';
import { itActsAsFavoriteMovieModel } from './contracts/favoriteMovieContract';

let favoriteMovies = [];

const FavoriteMovieArray = {
  getMovie(id) {
    if (!id) {
      return;
    }
    return favoriteMovies.find((movie) => movie.id === id);
  },

  getAllMovies() {
    return favoriteMovies;
  },

  putMovie(movie) {
    if (!movie.hasOwnProperty('id')) {
      return;
    }
    if (this.getMovie(movie.id)) {
      return;
    }
    favoriteMovies.push(movie);
  },

  deleteMovie(id) {
    const index = favoriteMovies.findIndex((movie) => movie.id === id);
    if (index !== -1) {
      favoriteMovies.splice(index, 1);
    }
  },

  searchMovies(query) {
    const loweredCaseQuery = query.toLowerCase().replace(/\s/g, '');
    return favoriteMovies.filter((movie) => {
      const loweredCaseMovieTitle = (movie.title || '-').toLowerCase().replace(/\s/g, '');
      return loweredCaseMovieTitle.includes(loweredCaseQuery);
    });
  },
};

describe('Favorite Movies Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteMovies = [];
  });

  itActsAsFavoriteMovieModel(FavoriteMovieArray);
});
