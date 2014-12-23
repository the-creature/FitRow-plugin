/* 
 * Fit row plugin
 * This code will make sure that all element align together nicely
 * meaning they all will be the same height w/o the need of a heavy plugin
 *
 */

( function($) {
    $.fn.fitRows = function(removeAt) {
      var tallestElm = 0, currentRowStart = 0, rowDivs = new Array();
      var $elm = $(this);

      function setConformingHeight(el, newHeight) {
        el.data("originalHeight", (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight")));
        el.height(newHeight);
      }

      function getOriginalHeight(el) {
        return (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight"));
      }

      function columnConform() {
        $elm.each(function() {
          var $el = $(this);

          var topPosition = $el.position().top;

          if (currentRowStart != topPosition) {
            for ( currentDiv = 0; currentDiv < rowDivs.length; currentDiv++)
              setConformingHeight(rowDivs[currentDiv], tallestElm);

            rowDivs.length = 0;
            currentRowStart = topPosition;
            tallestElm = getOriginalHeight($el);
            rowDivs.push($el);
          } else {
            rowDivs.push($el);
            tallestElm = (tallestElm < getOriginalHeight($el)) ? (getOriginalHeight($el)) : (tallestElm);
          }

          for ( currentDiv = 0; currentDiv < rowDivs.length; currentDiv++)
            setConformingHeight(rowDivs[currentDiv], tallestElm);
        });
      }     

      $(window).resize(function() {
          var width = $(document).width();

          if (width < 767)
            $elm.removeAttr('style');
          else
            columnConform();
      }); 

      columnConform();
    }
}(jQuery)); 
