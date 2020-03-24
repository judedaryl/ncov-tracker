import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, transform } from 'ol/proj';
import { OSM, XYZ} from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
import Style from 'ol/style/Style';
import { Feature } from 'ol';
import { Circle } from 'ol/geom';
import Fill from 'ol/style/Fill';
import { DragRotateAndZoom, defaults as defaultInteractions } from 'ol/interaction'
import Stroke from 'ol/style/Stroke';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() height: string = '500px';
  @Input() target: HTMLElement;
  @ViewChild('map', { static: true }) map: ElementRef<HTMLDivElement>;
  openLayerMap: Map;
  vectorLayers: VectorLayer[] = [];
  view: View;

  constructor() { }

  ngOnInit() {
    this.openLayerMap = new Map({
      target: this.target,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      interactions: defaultInteractions().extend([
        new DragRotateAndZoom()
      ]),
      view: new View({
        center: fromLonLat([120.99541, 14.555997]),
        zoom: 10
      })
    });
  }

  setCenter(latitude: number, longitude: number) {
    this.resetMap();
    
    this.openLayerMap.setView(new View({
      center: fromLonLat([longitude, latitude]),
      zoom: this.openLayerMap.getView().getZoom()
    }))

    // outer, inner, specific
    const radius = [30000, 1000, 100];
    const styles = [
      new Style({
        stroke: new Stroke({
          color: [0, 60, 113, 1],
          width: 5,
          lineDash: [20, 20]
        })
      }),
      new Style({
        fill: new Fill({
          color: [0, 123, 255, 0.3],
        })
      }),
      new Style({
        stroke: new Stroke({
          width: 5,
          color: [0, 123, 255, 0.5],
        })
      })
    ]

    for (var i = 0; i < radius.length; i++) {
      const circle = new Circle(transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'), radius[i])
      const style = styles[i];
      const vectorLayer = new VectorLayer({
        source: new Vector({
          features: [new Feature(circle)]
        }),
        style
      })
      this.vectorLayers.push(vectorLayer);
      this.openLayerMap.addLayer(vectorLayer);
    }

  }

  resetMap() {
    this.vectorLayers.forEach(q => {
      this.openLayerMap.removeLayer(q);
    })
  }

}
