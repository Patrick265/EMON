//import { Observable } from "rxjs/Rx"
import { Injectable } from "@angular/core"
//import { Http, Response } from "@angular/http"

@Injectable()
export class HttpClient {

    constructor(
        //public http: Http
    ) {}

    public fetchUsers() {
        //return this.http.get("localhost:8000/api/sensordata").map((res: Response) => res.json())
    }
}