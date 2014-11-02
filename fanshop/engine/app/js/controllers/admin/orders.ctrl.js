"use strict";

angular.module('shopApp').controller('adminOrdersController',
	['$scope', '$rootScope', '$http', '$timeout', function ($scope, $rootScope, $http, $timeout) {
	    $http({
	        method: 'GET',
	        url: '/api/basket/getAllSuccessBaskets'
	    }).success(function (data) {
	        $scope.list = data;
	    });

	    $scope.edit = function (item) {
	        $rootScope.$state.go('adminOrdersEdit', { basketId: item.Basket.Id });
	    };

	    $scope.delete = function (item) {
	        $http({
	            method: 'POST',
	            url: '/api/basket/removeBasket',
	            data: item.Basket
	        }).success(function () {
	            for (var i = 0; i < $scope.list.length; i++) {
	                if ($scope.list[i].Basket.Id == item.Basket.Id) {
	                    $scope.list.splice(i, 1);
	                    break;
	                }
	            }
	        });
	    };

	    $scope.export = function () {
	        $http.post('/api/product/export', { responseType: "arraybuffer" })
                .success(function (data, status, headers) {
                    saveFile(data, status, headers);
                })
                .error(function (data, status) {
                    if (data == 'no items') {
                        $scope.noItems = true;
                        $timeout(function() {
                            $scope.noItems = false;
                        }, 2000);
                    }
                });
	    };

	    var saveFile = function (data, status, headers) {

	        var octetStreamMime = "application/octet-stream";

	        // Get the headers
	        headers = headers();

	        // Get the filename from the x-filename header or default to "download.bin"
	        var filename = "export.xml";

	        // Determine the content type from the header or default to "application/octet-stream"
	        var contentType = headers["content-type"] || octetStreamMime;

	        if (navigator.msSaveBlob) {
	            // Save blob is supported, so get the blob as it's contentType and call save.
	            var blob = new Blob([data], { type: contentType });
	            navigator.msSaveBlob(blob, filename);
	            console.log("SaveBlob Success");
	        }
	        else {
	            // Get the blob url creator
	            var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
	            if (urlCreator) {
	                // Try to use a download link
	                var link = document.createElement("a");
	                if ("download" in link) {
	                    // Prepare a blob URL
	                    var blob = new Blob([data], { type: contentType });
	                    var url = urlCreator.createObjectURL(blob);
	                    link.setAttribute("href", url);

	                    // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
	                    link.setAttribute("download", filename);

	                    // Simulate clicking the download link
	                    var event = document.createEvent('MouseEvents');
	                    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	                    link.dispatchEvent(event);

	                    console.log("Download link Success");

	                } else {
	                    // Prepare a blob URL
	                    // Use application/octet-stream when using window.location to force download
	                    var blob = new Blob([data], { type: octetStreamMime });
	                    var url = urlCreator.createObjectURL(blob);
	                    window.location = url;

	                    console.log("window.location Success");
	                }

	            } else {
	                console.log("Not supported");
	            }
	        }

	    };
	}]);