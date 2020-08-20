import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {

  }

  getQuery(query:string){
  const url=`https://api.spotify.com/v1/${query}`;
  const headers = new HttpHeaders({
    'Authorization':'Bearer '
    //ingresar Bearer y token de autenticación por la api de spotify con postman
  });

  return this.http.get(url, {headers});
  }
  getNewReleases(){

    /*const headers = new HttpHeaders({
      'Authorization':'Bearer '
    });*/
    return this.getQuery('browse/new-releases?limit=20').pipe(map(data => data['albums'].items));
  }

  getArtists(term:string){
    /*const headers = new HttpHeaders({
      'Authorization':'Bearer '
    });*/
    return this.getQuery(`search?q=${term}&type=artist&limit=15`).pipe(map(data =>data['artists'].items));
  }

  getArtist(id:string){
    /*const headers = new HttpHeaders({
      'Authorization':'Bearer '
    });*/
    return this.getQuery(`artists/${id}`);
    //.pipe(map(data =>data['artists'].items));
  }

  getTopTracks(id:string){
    return this.getQuery(`artists/${ id }/top-tracks?country=US`)
    .pipe(map(data =>data['tracks']));
  }
}

