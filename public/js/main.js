
function trace(message)
{
    if (typeof console != 'undefined')
    {
        console.log(message);
    }
}

$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

        var  mn = $(".main-nav");
            mns = "main-nav-scrolled";
            hdr = $('header').height();

        $(window).scroll(function() {
          if( $(this).scrollTop() > hdr ) {
            mn.addClass(mns);
          } else {
            mn.removeClass(mns);
          }
        });



        // var map = L.map('map');
        //
        // var taxMarkers = new L.FeatureGroup();
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //  }).addTo(map);
        //
        // var geocodeService = L.esri.Geocoding.geocodeService();

        //var  groupname= "marker-select";
        //connect charts to their appropriate selectors
        var mapChart = dc_leaflet.markerChart("#dc-map-chart");
        var rowChart = dc.rowChart("#dc-row-chart");
        var timeChart = dc.lineChart("#dc-time-chart");
        var dataCount = dc.dataCount(".dc-data-count");
        var datatable = $('#dc-table-chart');
        //initial map view
        var defaultCenter = [42.360082,-71.058880];
        var defaultZoom = 11;





        // function Geocode(street_address){
        //     var geocoder = new google.maps.Geocoder();
        //     var address = street_address+ "Boston, MA USA";
        //     var geo;
        //     geocoder.geocode( { 'address': address}, function(results, status) {
        //
        //         if (status == google.maps.GeocoderStatus.OK) {
        //             var latitude = results[0].geometry.location.lat();
        //             var longitude = results[0].geometry.location.lng();
        //             geo = latitude + "," + longitude;
        //         }
        //         else {
        //             geo = "42.3570834351564, -71.06059027753906";
        //         }
        //         console.log(geo);
        //
        //
        //     });
        //     return geo;
        //
        // }
        // function getPID(){
        //     // the url from the map service query page
        //     var url = 'http://gis.cityofboston.gov/arcgis/rest/services/SAM/Live_SAM_Address/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson';
        //
        //     // get the JSON data, make sure to add the callback
        //     $.getJSON(url+'&callback=?',function(data){
        //         _.each(data.features, function(data){
        //             // console.log(data.attributes.PARCEL);
        //         });
        //         //   console.log(taxData);
        //     })
        // }

        function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }



        d3.json('/index', function(error, data){
            var taxData = data
            var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S.%L");
            //console.log(taxData);
            _.each(taxData, function(d) {
                d.date_u = dateFormat.parse(d.Last_UPDATED);

                //console.log(d.date_u);
                d.balance = d["Balance Due"];
                //console.log(d.balance);
                d.collections= d["Col Tot Due"];
                address_space = d["Location"];
                d.address= address_space.replace(/\s+/g,' ').trim();
                //console.log(d.address);
                 //d.geo = Geocode(d.address);
                 //console.log(d.geo);

                d.type = d["Cl"];
                //console.log(d.type);
                description= d["Property Description"];
                d.sqft =description.replace(/\s+/g,' ').trim();
                //console.log(d.sqft);
                pid_dash=d["Wd-Parcl-Sub"];
                d.pid= pid_dash.replace(/-/g, "");
                d.date = randomDate(new Date(2014, 0, 1), new Date(2016, 0, 1));
                //console.log(d.date);
                // parse lat lng-data
                //console.log(d.YCOORD);
        		if (d.YCOORD !=null && d.YCOORD!=undefined) {
        			d.geo = d.YCOORD + "," + d.XCOORD;
        		} else {
        			d.geo = "42.360082,-71.058880" //dummy coordinates, NYC
        		}
                //console.log(d.geo);

            });

            // var url = 'http://gis.cityofboston.gov/arcgis/rest/services/SAM/Live_SAM_Address/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson';
            //
            // // get the JSON data, make sure to add the callback
            // $.getJSON(url+'&callback=?',function(data){
            //     //console.log(data.features)
            //     console.log(taxData)
            //     var pidData = data.features;
            //     _.each(taxData, function(d){
            //         var pidMatches = _.filter(pidData, function(pid) { return d.pid == pid.attributes.PARCEL });
            //         //console.log(pidMatches, d)
            //         // console.log(d.pid)
            //         // assign new values to all the matches
            //     });
            // })


            //toplevel crossfilter
        	var xf = crossfilter(data);


        	//counter
        	var all = xf.groupAll();
        	dataCount.dimension(xf)
        		.group(all);


            //map
        	var incidents = xf.dimension(function(d) { return d.geo; });
        	mapChart.dimension(incidents)
        	  .group(incidents.group())
        	  .width(530)
        	  .height(600)
        	  .margins({top: 10, right: 10, bottom: 20, left: 40})
        	  .center(defaultCenter)
              .brushOn(true)
        	  .zoom(defaultZoom)
            //   .popup(function(d){
            //       console.log(d);
            //   })
        	  .renderPopup(true)
        	  .cluster(true);


              //row chart
            var type = xf.dimension(function(d) { return d.type; });
            rowChart.height(600)
              .width(330)
              .margins({top: 10, right: 10, bottom: 20, left: 40})
              .dimension(type)
              .group(type.group())
              .ordering(function (p) {
                  return -p.value;
              })
              .elasticX(true);

              //time series bar chart
          	var issuanceDates = xf.dimension(function (d) { return d.date; });
            var minDate = issuanceDates.bottom(1)[0].date;
            var maxDate = issuanceDates.top(1)[0].date;

            timeChart.width(960)
        		.height(200)
                .renderArea(true)
        		.margins({top: 10, right: 10, bottom: 20, left: 40})
        		.dimension(issuanceDates)
        		.group(issuanceDates.group(d3.time.week))
        		.transitionDuration(500)
        		.elasticY(true)
        		.x(d3.time.scale().domain([minDate,maxDate]))
        		.round(d3.time.week.round)
        		.xUnits(d3.time.weeks)
        		.elasticY(true)
        		.elasticX(true)
        		.xAxis().ticks(5);



            //table
        	//dimension for table search
        	var tableDimension = xf.dimension(function (d) { return d.type.toLowerCase() + ' ' +
        													d.pid.toLowerCase() + ' ' +
        													d.address.toLowerCase() + ' ' +
        													d.balance.toLowerCase();});


            //set options and columns
            var dataTableOptions = {
                "bSort": true,
                columnDefs: [
                    {
                        targets: 0,
                        data: function (d) { return d.date; },
                        type: 'date',
                        defaultContent: 'Not found'
                    },
                    {
                        targets: 1,
                        data: function (d) { return "<h5>"+ d.pid+"</h5>"; },
                        defaultContent: ''
                    },
                    {
                        targets: 2,
                        data: function (d) { return d.address; },
                        defaultContent: ''
                    },
                    {
                        targets: 3,
                        data: function (d) { return "$"+d.balance;},
                        defaultContent: ''
                    },
                    {
                        targets: 4,
                        data: function (d) {return d.type;},
                        defaultContent: ''
                    },
                    {
                        targets: 5, //search column
                        data: function (d) {return d.type;},
                        defaultContent: '',
                        visible: false
                    }
                ]
            };

            //initialize datatable
            datatable.dataTable(dataTableOptions);
            $( ".dataTables_wrapper .dataTables_filter input" ).appendTo( $( ".buttons" ))

            //row details
            function format ( d ) {
                return '<b>Balance: $' + d.balance +'</b>';
            }

            datatable.DataTable().on('click', 'tr[role="row"]', function () {
                var tr = $(this);
                var row = datatable.DataTable().row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );

            //custom refresh function, see http://stackoverflow.com/questions/21113513/dcjs-reorder-datatable-by-column/21116676#21116676
            function RefreshTable() {
                    dc.events.trigger(function () {
                        alldata = tableDimension.top(Infinity);
                        datatable.fnClearTable();
                        datatable.fnAddData(alldata);
                        datatable.fnDraw();
                    });
                }

            //call RefreshTable when dc-charts are filtered
            for (var i = 0; i < dc.chartRegistry.list().length; i++) {
                var chartI = dc.chartRegistry.list()[i];
                chartI.on("filtered", RefreshTable);
            }

            //filter all charts when using the datatables search box
             $(":input").on('keyup',function(){
                text_filter(tableDimension, this.value);//cities is the dimension for the data table

            function text_filter(dim,q){
                 if (q!='') {
                    dim.filter(function(d){
                        return d.indexOf (q.toLowerCase()) !== -1;
                    });
                } else {
                    dim.filterAll();
                    }
                RefreshTable();
                dc.redrawAll();}
            });

            // //reset map view on clicking the reset button
             $("#mapReset").on('click', function() {
                mapChart.map().setView(defaultCenter, defaultZoom);
             });
             // //reset row view on clicking the reset button
              $("#rowReset").on('click', function() {
                rowChart.filterAll();dc.redrawAll();
              });
            //initial table refresh
            RefreshTable();
            //initialize other charts
            dc.renderAll();



            d3.select('#download')
                .on('click', function() {
                    var data = type.top(Infinity);

                    var blob = new Blob([d3.csv.format(data)], {type: "text/csv;charset=utf-8"});
                    saveAs(blob, 'data.csv');
                });


        })
