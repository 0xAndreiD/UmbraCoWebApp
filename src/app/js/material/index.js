window.getStyle = function(indexNum, isLast) {
  var sInitial = [
    [100, 100, 50, 100],
    [50, 100, 50, 50]
  ];
  var initPoint = indexNum % 2;
  var zoomLevel = Math.pow(2, parseInt(indexNum / 2));
  const sPos = [
    100 - sInitial[initPoint][0] / zoomLevel,
    100 - sInitial[initPoint][1] / zoomLevel,
    sInitial[initPoint][0] / zoomLevel - sInitial[initPoint][2] / zoomLevel,
    sInitial[initPoint][1] / zoomLevel - sInitial[initPoint][3] / zoomLevel
  ];
  var bgcolors = ['#F5F5F5', '#7e7e7e', '#EEEEEE', '#212121', '#616161', '#7e7e7e'];
  var colors = ['#000', '#000', '#000', '#fff', '#fff', '#000'];
  return {
    left: sPos[0] + "%",
    top: sPos[1] + "%",
    right: (isLast ? "0" : sPos[2]) + "%",
    bottom: (isLast ? "0" : sPos[3]) + "%",
    backgroundColor: bgcolors[indexNum % bgcolors.length],
    color: colors[indexNum % colors.length]
  };
}

// font handeling
$(function() {
  $(function() {
    initfontsize();
  });
  window.addEventListener("resize", function() {
    initfontsize();
  }, false);
});



function initfontsize() {
  var bwidth = $("body").width();
  var size = size = 100;
  if (bwidth < 768) {
    size = 50;
  }
  $('html').css('font-size', size + "%");
}
