import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { Heatmap as HeatmapLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, transform } from 'ol/proj';
import { OSM, XYZ, Stamen } from 'ol/source';
import Vector from 'ol/source/Vector';
import Style from 'ol/style/Style';
import { Feature } from 'ol';
import { Circle } from 'ol/geom';
import Fill from 'ol/style/Fill';
import { DragRotateAndZoom, defaults as defaultInteractions } from 'ol/interaction'
import Stroke from 'ol/style/Stroke';
import { KML, TopoJSON } from 'ol/format';
import { HttpClient } from '@angular/common/http';
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

  constructor(private client: HttpClient) { }

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

    for (let i = 0; i < radius.length; i++) {
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

  async setHeatmap(coordinates: MapCoordinate[]) {
    // var json = await this.client.get('https://raw.githubusercontent.com/deldersveld/topojson/master/countries/philippines/philippines-provinces.json').toPromise();
    // var topo = new TopoJSON({ layers: ['PHL_adm1'] }).readFeatures(json, {
    //   dataProjection: 'EPSG:4326',
    //   featureProjection: 'EPSG:3857'
    // });
    // let count: number[] = [];
    // let coords = [...coordinates];
    // for (let i = 0; i < topo.length; i++) {
    //   console.log(`CHECKING ${i}`)
    //   var geo = topo[i].getGeometry();
    //   let _count = 0;
    //   for (let x = 0; x < coords.length; x++) {
    //     const { longitude, latitude } = coords[x];
    //     if (geo.intersectsCoordinate([longitude, latitude])) {
    //       console.log('HIT')
    //       _count++;
    //     } else {
    //       console.log('MISS')
    //     }
    //   }
    //   count[i] = _count;
    // }

    // console.log(count);
    // let divisor = Math.max(...count);
    

    // for (let i = 0; i < topo.length; i++) {
    //   console.log(divisor)
    //   console.log('HEY')
    //   let x = count[i] / divisor;
    //   console.log(x);
    //   let hex = HSLToHex(0, 100, x);
    //   console.log(hex);
    //   topo[i].setStyle(new Style({
    //     fill: new Fill({
    //       color: hex
    //     })
    //   }))
    // }


    // const source = new Vector({
    //   features: topo
    // });
    // var vector = new VectorLayer({
    //   source
    // });

    // console.log(topo);
    // var style = new Style({
    //   fill: new Fill({
    //     color: 'rgba(255, 255, 255, 0.6)'
    //   }),
    //   stroke: new Stroke({
    //     color: '#319FD3',
    //     width: 1
    //   })
    // });

    // vector.setStyle(style);



    // this.openLayerMap.addLayer(vector)
  }

  resetMap() {
    this.vectorLayers.forEach(q => {
      this.openLayerMap.removeLayer(q);
    })
  }

}

export interface MapCoordinate {
  latitude: number;
  longitude: number;
}



function HSLToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  let _r = Math.round((r + m) * 255).toString(16);
  let _g = Math.round((g + m) * 255).toString(16);
  let _b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (_r.length == 1)
    _r = "0" + _r;
  if (_g.length == 1)
    _g = "0" + _g;
  if (_b.length == 1)
    _b = "0" + _b;

  return "#" + _r + _g + _b;
}