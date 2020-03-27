# COVID Tracker Philippines

[![Build status](https://dev.azure.com/clarinojd/Covid-19%20Tracker/_apis/build/status/COVID%20Tracker%20PROD)](https://dev.azure.com/clarinojd/Covid-19%20Tracker/_build/latest?definitionId=7)


This project is meant as a lightweight mobile friendly alternative to the official [DOH NCov Tracker](https://ncovtracker.doh.gov.ph/). It aims to provide a better user experience to the Filipino community as a whole amidst this Pandemic.

This application currently supports tracking for the Philippines only. Rest assured we are working on a solution that would cater a glocal scale.

If you are from the **United States**, my colleague [@vdurano](https://github.com/proudmonkey) has a tracker for **Minnesota** which can be found here [NCov tracker MN]( http://trackncov.vmsdurano.com/)

## Tech Stack

- Framework - **Angular 8.3** (Not moving to 9.0 yet)
- CI/CD - **Azure Pipelines**
- Hosting - **Azure Blob Storage**
- Distribution - **Azure CDN**
- Data source - All data comes from [ESRI Arcgis](https://www.esri.com/en-us/home).

## Dependencies
- [ngx-virtual-scroller](https://www.npmjs.com/package/ngx-virtual-scroller)
- Charting [highcharts-angular](https://www.npmjs.com/package/highcharts-angular)
- Styling [bootstrap](https://getbootstrap.com)
- Maps - [openlayers](https://www.npmjs.com/package/ol)
- Save files (desktop only) - [file-saver](https://www.npmjs.com/package/file-saver)

## Support

If this project was helpful to you, considering buying me a beer or a cup of coffee! 

<div class="donate">
<a href="https://www.paypal.me/judedaryl">
    <img src="https://proudmonkeystorage.blob.core.windows.net/cdn/common/donate_paypal.svg" height="37">
</a>
<a href="https://www.buymeacoffee.com/exkpSj2">
    <img src="https://proudmonkeystorage.blob.core.windows.net/cdn/common/donate_coffee.png"></a>
</div>
