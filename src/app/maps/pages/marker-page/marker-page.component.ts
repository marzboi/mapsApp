import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

@Component({
  templateUrl: './marker-page.component.html',
  styleUrls: ['./marker-page.component.css'],
})
export class MarkerPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;

  public currentLngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'element not found';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    // const marketHtml: HTMLElement = document.createElement('div');
    // marketHtml.innerHTML = 'Hello World';

    // const marker = new Marker({
    //   color: 'red',
    //   element: marketHtml,
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);
  }

  createMarket() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const LngLat = this.map.getCenter();
    this.addMarket(LngLat, color);
  }

  addMarket(lngLat: LngLat, color: string = 'red') {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color,
      marker,
    });
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(market: Marker) {
    if (!this.map) return;

    this.map.flyTo({
      zoom: 14,
      center: market.getLngLat(),
    });
  }
}
