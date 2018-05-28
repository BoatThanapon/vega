import * as _ from 'underscore';
import { SaveVehicle, Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ngx-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/Observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
    makes: any[];
    models: any[];
    features: any[];
    vehicle: SaveVehicle = {
        id: 0,
        makeId: 0,
        modelId: 0,
        isRegistered: false,
        features: [],
        contact: {
            name: '',
            email: '',
            phone: '',
        }
    };
    topic: any = "New Vehicle";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService,
        private toastyService: ToastyService
    ) {
        route.params.subscribe(p => {
            this.vehicle.id = +p['id']|| 0;
        });
    }

    ngOnInit() {
        var sources = [
            this.vehicleService.getMakes(),
            this.vehicleService.getFeatures(),
        ];

        if (this.vehicle.id){
            this.topic = "Vehicle"
            sources.push(this.vehicleService.getVehicle(this.vehicle.id))
        }

        Observable.forkJoin(sources).subscribe(data => {
            this.makes = data[0];
            this.features = data[1];

            if (this.vehicle.id) {
                this.setVehicle(data[2]);
                this.populateModels();
            }
        }, err => {
            if (err.status == 404)
                this.router.navigate(['/vehicles']);
        });
    }

    private setVehicle(v: Vehicle) {
        this.vehicle.id = v.id || 0;
        this.vehicle.makeId = v.make.id;
        this.vehicle.modelId = v.model.id;
        this.vehicle.isRegistered = v.isRegistered;
        this.vehicle.contact = v.contact;
        this.vehicle.features = _.pluck(v.features, 'id');
        // this.vehicle.features = this.vehicle.features = v.features.map(f => f.id);
    }

    private populateModels() {
        var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
        this.models = selectedMake ? selectedMake.models : [];
    }

    onMakeChange() {
        this.populateModels();

        delete this.vehicle.modelId;
    }

    onFeatureToggle(featureId: any, event: any) {
        if (event.target.checked) {
            this.vehicle.features.push(featureId);
        }
        else {
            var index = this.vehicle.features.indexOf(featureId);
            this.vehicle.features.splice(index, 1);
        }
    }

    submit() {
        var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle); 
        result$.subscribe(vehicle => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Data was sucessfully saved.',
            theme: 'default',
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(['/vehicles/', vehicle.id])
        });
    }

    delete(){
        if(confirm("Are you sure?")){
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(vehicle => {
                    this.router.navigate(['/vehicles']);
                });
        }
    }
}
