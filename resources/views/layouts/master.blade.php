<!doctype html>
<html>
<style type="text/css">
</style>

<title>
    {{-- Yield the title if it exists, otherwise default to 'Safety Application' --}}
    @yield('title','Tax Title Application')
</title>

<meta charset='utf-8'>
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0' name='viewport'>
<link type="text/css" href="css/leaflet.css" rel="stylesheet"/>
<link type="text/css" href="css/leaflet.markercluster.css" rel="stylesheet"/>
<link type="text/css" href="css/MarkerCluster.Default.css" rel="stylesheet"/>
<link type="text/css" href="css/dc.css" rel="stylesheet"/>
<link type="text/css" href="css/bootstrap.min.css" rel="stylesheet">
<link type="text/css" href="css/jquery.dataTables.min.css" rel="stylesheet">
<link href='/css/main.css' rel='stylesheet'>
<link href="https://fonts.googleapis.com/css?family=Montserrat|Raleway" rel="stylesheet">
<!-- <link href="/css/safetymap.css" type='text/css' rel='stylesheet'> -->






<body>


    <header>
        <img class="title_header" id ="logo"
        src='/images/logo1.png'
        alt='COB Seal'>
        <h1 class="title_header">Tax Title Properties </h1>
        <img class="title_header" id ="icon"
        src='/images/icon.svg'
        alt='COB icon'>

    </header>

    <nav class="main-nav">
        <div class= "buttons">
            <button class="btn" type="button" id ="about"  data-toggle="modal" data-target="#myModal">About</button>
            <button class="btn" id="download">Download Data</button>
            <label class= "search"> SEARCH </label>
        </div>
      <!-- <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul> -->
    </nav>




@if(Session::get('message')!= null)
<div class= 'flash_message'>{{Session::get('message')}}</div>
@endif


    <!-- <a href='/index'>view json</a> -->

    <!-- <section>
        {{-- Main page content will be yielded here --}}
        @yield('content')
    </section>

    <section>
        {{-- Main page content will be yielded here --}}
        @yield('page-script')
    </section> -->

    {{-- Yield any page specific JS files or anything else you might want at the end of the body --}}
    @yield('body')
    <div class= "main">
        <div class='container' id='main-container'>
            <div class='content'>
                <div class='container' style='font: 12px sans-serif;'>
                    <div class = 'row'>
                        <div class="col-xs-10 dc-data-count" style = 'float:left;'>
                            <h2>Boston Tax Title Dashboard
                                <span>
                                    <span class="filter-count"></span>
                                    selected out of
                                    <span class="total-count"></span>
                                    records
                                </span>
                            </h2>
                        </div>
                    </div>

                <div class = 'row'>
                    <div class='col-xs-9' id='dc-map-chart' style = 'float:left;'>
                        <h3>
                                Map -Incident Locations
                                <span>
                                    <a class="reset"
                                    href="#" id="mapReset"
                                    style="display: none;">
                                    reset
                                </a>
                            </span>
                        </h3>
                    </div>

                <div class='col-xs-3' id = 'dc-row-chart'>
                    <h3>
                        Row Chart - Land Use Types
                        <span>
                            <a class="reset" id="rowReset"
                            style="display: none;">
                            reset
                        </a>
                    </span>
                </h3>
            </div>
        </div>

        <div class='row'>
            <div class='col-xs-12' id='dc-time-chart'>
                <h3>Bar Chart - Tax Title by issuance date</h3>
            </div>
        </div>
                <div class='row'>
                    <div class='col-xs-12'>
                        <h3>Data Table</h3>
                        <table class='table table-hover' id='dc-table-chart'>
                            <thead>
                                <tr class='header'>
                                    <th>Issuance Date</th>
                                    <th>PID</th>
                                    <th>Address</th>
                                    <th>Collection Total Due</th>
                                    <th>Landuse</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" id="myModal">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div id="about_content">
                <h2>Tax Title Properties</h2>
            </div>
        </div>
    </div>
</div>
</body>

<!-- AIzaSyCSBMwRPDcjwvcWP39rn4sTxd3ciA_devA -->


<!-- Google Maps and Drawing API -->
<!-- <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=drawing&sensor=false"></script> -->
<!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGMhObtzwBH59AwYF3PnC5muqms-bxJDw&callback=initMap"type="text/javascript"></script> -->
<script type="text/javascript" src="js/d3.js"></script>
<script type="text/javascript" src="js/crossfilter.js"></script>
<script type="text/javascript" src="js/dc.js"></script>
<script type="text/javascript" src="js/leaflet.js"></script>
<script type="text/javascript" src='js/jquery.js'></script>
<script type="text/javascript" src='js/jquery.dataTables.min.js'></script>
<script type="text/javascript" src='js/bootstrap.min.js'></script>
<script type="text/javascript" src="js/leaflet.markercluster.js"></script>
<script type="text/javascript" src="js/dc.leaflet.js"></script>
<script type="text/javascript" src="js/underscore-min.js"></script>
<script type="text/javascript" src="js/FileSaver.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
</html>
