import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
/*import { HttpClient } from '@angular/common/http';*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

/*  paises: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe((respuesta: any) =>{
    this.paises=respuesta;
    console.log(respuesta);
    })
  } */

  newSongs:any[]=[];
  loading: boolean;
  error:boolean;
  mensajeError: string;
  constructor(private spotify: SpotifyService){
    this.loading=true;
    this.error=false;
    let tmp=this;
    setTimeout(() => {
      this.spotify.getNewReleases()
      .subscribe((data:any)=>{
        //console.log(data);
        this.newSongs = data;
        this.loading=false;
    },(errorServicio)=>{
      this.loading=false;
      this.error=true;
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error.message;
    });
    }, 1000);
  }
  ngOnInit() {
  }

}
