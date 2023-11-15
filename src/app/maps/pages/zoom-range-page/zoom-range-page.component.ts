import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  public zoomLevel: number = 10;

  public map?: Map;

  public currentLngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'element not found';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'map not found';

    this.map.on('zoom', (event) => {
      this.zoomLevel = this.map!.getZoom();
    });

    this.map.on('zoomend', (event) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', (event) => {
      this.currentLngLat = this.map!.getCenter();
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoomLevel = Number(value);
    this.map?.zoomTo(this.zoomLevel);
  }
}
