import { Vehicle, SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class VehicleService {
    head: any;
    private readonly vehiclesEndpoint = '/api/vehicles';

    constructor(private http: Http) {
        const headers = new Headers();
        const id_token = localStorage.getItem('id_token');
        console.log(id_token);
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFWTBSVUpGTmpkRFFqUXlNVUV4TlVWRk5FRkVNelZET0RGRVFUYzFRVVV3TVVWQk9USXpNQSJ9.eyJpc3MiOiJodHRwczovL3RoYW5hcG9uLmF1dGgwLmNvbS8iLCJzdWIiOiJxNWxHaFAzeTZpejdyN09ZYmJhOGFvQUxlQTJpNFR5YkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGkudmVnYS5jb20iLCJpYXQiOjE1MjY5MDY3MzYsImV4cCI6MTUyNjk5MzEzNiwiYXpwIjoicTVsR2hQM3k2aXo3cjdPWWJiYThhb0FMZUEyaTRUeWIiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Yf6nJlZ1N_RDxN5iWRCjMx8HS5GOgVKFD2KAUE3o7ns_VfGGNdi37ZbWFXgdnxp8ovQrcYaXNvH3KJuNfNcDoBWZ_5DGXfqRiCwuQV50uGN6w58XC0XF0BsAMEjzfTSnFM3nVI87VV0OVuhcCw8T-zwIbk-kUm0VAfruuo2C29GR1CnjWIrpFrYOPe4WdTOSqScsLWBv30KY_66EaY_LM_MQBgIKeV77cnzVwF7uE2O4D_CPN5m63q6GVWgLykhd5CVnCtpRwpMKAETTzOMI4KJuui1J7YaBKQ50XKXGTdQZjG8DDu3iAEOwzGMXSmvqBRYpPHDBF_AK6BhMALwGLQ');
        const options = new RequestOptions({ headers: headers });
        this.head = options;
    }

    getMakes() {
        return this.http.get('/api/makes').map(res => res.json());
    }

    getFeatures() {
        return this.http.get('/api/features').map(res => res.json());
    }

    create(vehicle: SaveVehicle) {
        return this.http.post(this.vehiclesEndpoint, vehicle, this.head).map(res => res.json());
    }

    getVehicle(id: number) {
        return this.http.get(this.vehiclesEndpoint + '/' + id)
            .map(res => res.json());
    }

    getVehicles(filter: any) {
        return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
            .map(res => res.json());
    }

    toQueryString(obj: any) {
        var parts = [];
        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
        }

        return parts.join('&');
    }

    update(vehicle: SaveVehicle) {
        console.log(this.head);

        return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle, this.head).map(res => res.json());
    }

    delete(id: any) {
        return this.http.delete(this.vehiclesEndpoint + '/' + id, this.head).map(res => res.json());
    }
}
