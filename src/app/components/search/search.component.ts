import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artists: any[] = [];
  loading: boolean;
  constructor(private spotify: SpotifyService) { }

  search(term: string) {
    if (term) {
      this.loading = true;
      let tmp = this;
      //console.log(term);
      setTimeout(() => {
        this.spotify.getArtists(term)
          .subscribe((data: any) => {
            //console.log(data);
            this.artists = data;
            this.loading = false;
          });
      }, 1000);
    } else {
      this.artists = [];
    }
  }
  ngOnInit() {
  }

}
