/*

 jquery-image-loader

 Created at: 2011-12-01 08:32:01 +0200
 Author: Yves Van Broekhoven
 Version: 1.1.9
 https://github.com/mrhenry/jquery-image-loader

 How to use:

 HTML:

 <div class="wrapper">
   <img data-src="url-to-image.jpg">
 </div>


 JS:

 $('.wrapper').loadImages({
   imgLoadedClb: function(){},
   allLoadedClb: function(){},
   imgErrorClb:  function(){},
   noImgClb:     function(){},
   dataAttr:     'src'
 });

*/
(function(b){var j,i,k;b.fn.loadImages=function(c){c=b.extend({},b.fn.loadImages.defaults,c);this.each(function(){var d=this,a=b(d),e;e=a.is("img[data-"+c.dataAttr+"]")?a:a.find("img[data-"+c.dataAttr+"]");1>e.length&&b.isFunction(c.noImgClb)?c.noImgClb.call(d):(a.data("dfd",b.Deferred()),a.data("options",c),a.data("total_images_count",e.length),a.data("processed_count",0),a.data("failed_count",0),b.when(j.call(d,e)).then(function(){b.isFunction(c.allLoadedClb)&&c.allLoadedClb.call(d)}))});return this};
j=function(c){var d=this,a=b(d),e=a.data("options"),a=a.data("dfd");c.each(function(){var a=b(this);a.load(function(){i.call(d,a[0],"success")}).error(function(){i.call(d,a[0],"error")}).attr("src",a.data(e.dataAttr))});return a.promise()};i=function(c,d){var a=b(this),e=a.data("dfd"),f=a.data("options"),g=a.data("processed_count")+1,h=a.data("total_images_count");a.data("processed_count",g);"success"===d&&b.isFunction(f.imgLoadedClb)&&f.imgLoadedClb.call(c,g,h);"error"===d&&(a.data("failed_count",
a.data("failed_count")+1),b(this).unbind("load"),b.isFunction(f.imgErrorClb)&&f.imgErrorClb.call(c,g,h));g===h&&(a.data("failed_count")===h?(b.isFunction(f.noImgClb)&&f.noImgClb.call(this),e.reject()):e.resolve(),k.call(this))};k=function(){b(this).removeData("dfd","options","total_images_count","processed_count","failed_count")};b.fn.loadImages.defaults={imgLoadedClb:!1,allLoadedClb:!1,imgErrorClb:!1,noImgClb:!1,dataAttr:"src"}})(jQuery);
