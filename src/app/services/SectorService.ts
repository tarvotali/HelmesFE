import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Sector} from "../models/sector";

@Injectable({
  providedIn: 'root'
})

export class SectorService {

  private apiUrl = "http://localhost:8080/api/sectors";

  constructor(private http: HttpClient) {
  }

  getAllSectors(): Observable<Sector[]> {
    console.log("Getting sector list")
    return this.http.get<Sector[]>(this.apiUrl);
  }
}
