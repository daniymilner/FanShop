(function(angular){
	'use strict';

	angular.module('aj.crop', [])
		.directive('imgCropped', ['$window', '$timeout', function($window, $timeout){
			var bounds = {};
			return {
				restrict: 'E',
				replace: true,
				scope: false,
				require: 'ngModel',
				link: function(scope, element, attrs, ngModel){
					var cropImg, cropH = 0, cropW = 0, imgH = 0, imgW = 0, x=0, y=0, x1=0, y1=0,
						clear = function(){
							if(cropImg){
								cropImg.next().remove();
								cropImg.remove();
								cropImg = undefined;
							}
						};

					scope.$watch(function(){
						return ngModel.$modelValue;
					}, function(newValue){
						if(newValue){
							clear();
							element.after('<img id="cropedImg" />');
							cropImg = element.next();
							if(attrs.base64){
								cropImg.attr('src', attrs.base64);
							}else{
								cropImg.attr('src', newValue);
							}
							cropImg.Jcrop({
								allowSelect: false,
								boxWidth: 410, boxHeight: 410,
								bgColor: 'transparent',
								bgOpacity: 0.3,
								minSize: [10, 10],
								onSelect: function(cords) {
									scope.$parent.onCropChange({cords: cords});
								}
							},function (){
								var jcrop_api = this,
									boundsArr = this.getBounds();
								bounds.x = boundsArr[0];
								bounds.y = boundsArr[1];
								if(attrs.cropWidth && attrs.cropHeight){
									cropW = parseInt(attrs.cropWidth);
									cropH = parseInt(attrs.cropHeight);
								}
								imgW = parseInt(bounds.x);
								imgH = parseInt(bounds.y);
								x = imgW/2 - cropW/2;
								y = imgH/2 - cropH/2;
								x1 = x + cropW;
								y1 = y + cropH;
								jcrop_api.setSelect([x, y, x1, y1]);
								jcrop_api.setOptions({ bgFade: true });
							});
						}
					});

					scope.$on('$destroy', clear);
				}
			};
		}])

		.directive('imgCropCanvas', ['$window', '$timeout', function($window, $timeout){
			return {
				restrict: 'E',
				replace: true,
				scope: false,
				template:'<canvas id="imgCropCanvasPreview" style="display:none;"></canvas>',
				link: function(scope, element, attrs, ngModel){
					if(scope.$parent.cropCoords.cords){
						var cords = scope.$parent.cropCoords.cords,
							canvas = document.getElementById("imgCropCanvasPreview"),
							context = canvas.getContext("2d"),
							img = document.getElementById("cropedImg"),
							imgUrl;

						canvas.width = cords.w;
						canvas.height = cords.h;
						context.drawImage(img,cords.x,cords.y,cords.w,cords.h,0,0,cords.w,cords.h);
						imgUrl = canvas.toDataURL();
						scope.$parent.onSetCropCanvas(imgUrl);
					}
				}
			};
		}]);
})(angular);
