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
    'Authorization':'Bearer BQAYfwv7RAZ9UnxRpTP7Jkw-4v87Qs-7L-iXaq15YTWaQshjcvIpvZve2Ens1AnLaqxM1sEIMubxj4TN8bE'
  });

  return this.http.get(url, {headers});
  }
  getNewReleases(){

    /*const headers = new HttpHeaders({
      'Authorization':'Bearer BQByMDhqpE__0imEc6cPWz3qzaTZHBBsywj2ftM93TOw4SwCina7WYyUDqNIFYcv9c4IBryXmNBeWk32W2k'
    });*/
    return this.getQuery('browse/new-releases?limit=20').pipe(map(data => data['albums'].items));
  }

  getArtists(term:string){
    /*const headers = new HttpHeaders({
      'Authorization':'Bearer BQByMDhqpE__0imEc6cPWz3qzaTZHBBsywj2ftM93TOw4SwCina7WYyUDqNIFYcv9c4IBryXmNBeWk32W2k'
    });*/
    return this.getQuery(`search?q=${term}&type=artist&limit=15`).pipe(map(data =>data['artists'].items));
  }

  getArtist(id:string){
    /*const headers = new HttpHeaders({
      'Authorization':'Bearer BQByMDhqpE__0imEc6cPWz3qzaTZHBBsywj2ftM93TOw4SwCina7WYyUDqNIFYcv9c4IBryXmNBeWk32W2k'
    });*/
    return this.getQuery(`artists/${id}`);
    //.pipe(map(data =>data['artists'].items));
  }

  getTopTracks(id:string){
    return this.getQuery(`artists/${ id }/top-tracks?country=US`)
    .pipe(map(data =>data['tracks']));
  }
}

