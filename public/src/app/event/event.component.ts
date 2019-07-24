import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

import {} from 'googlemaps';
// import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    header = 'Events';
    map;
    // infoWindow;
    marker;
    // image = "http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png"

  constructor(private _httpService: HttpService) { 
  }
  
  ngOnInit() {
    this.initMap();
 }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 12,
      // styles: [   // gives the map a 'night mode' appearance
      //   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      //   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      //   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      //   {
      //     featureType: 'administrative.locality',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'poi',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'poi.park',
      //     elementType: 'geometry',
      //     stylers: [{color: '#263c3f'}]
      //   },
      //   {
      //     featureType: 'poi.park',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#6b9a76'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'geometry',
      //     stylers: [{color: '#38414e'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'geometry.stroke',
      //     stylers: [{color: '#212a37'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#9ca5b3'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'geometry',
      //     stylers: [{color: '#746855'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'geometry.stroke',
      //     stylers: [{color: '#1f2835'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#f3d19c'}]
      //   },
      //   {
      //     featureType: 'transit',
      //     elementType: 'geometry',
      //     stylers: [{color: '#2f3948'}]
      //   },
      //   {
      //     featureType: 'transit.station',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'geometry',
      //     stylers: [{color: '#17263c'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#515c6d'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'labels.text.stroke',
      //     stylers: [{color: '#17263c'}]
      //   }
      // ]
    });
    console.log(this.map)
    // this.infoWindow = new google.maps.InfoWindow;
    this.marker = new google.maps.Marker({
      position: this.map.center,
      map: this.map,
      // icon: this.image
    })

    if (navigator.geolocation) {                        // will pull locaiton based on current location
      navigator.geolocation.getCurrentPosition((position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
          this.marker.setPosition(pos);
          // this.infoWindow.setContent("Your're here!");
          // this.infoWindow.open(this.map);
          this.map.setCenter(pos);
      }), function() {
        this.handleLocationError(true, this.infoWindow, this.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.marker, this.map.getCenter());
    }
  }

  handleLocationError(browserHasGeolocation, marker, pos) {
    marker.setPosition(pos);
    // infoWindow.setContent(browserHasGeolocation ? 
    //   'Error: The Geolocation service failed.' : 
    //   'Error: Your browser doesn\'t support geolocation.');
    // infoWindow.open(this.map);
  }
}



  // @ViewChild('map', {static: true}) mapElement: any;
    // map: google.maps.Map;

  // initMap() {
  //   this.map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 8
  //   });
  // }

// ng on init:
 // const mapProperties = {
    //     center: new google.maps.LatLng(35.2271, -80.8431),
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);