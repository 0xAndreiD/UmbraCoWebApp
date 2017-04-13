const getBackgroundColor = function(indexNum) {
  var bgcolors = ['#F5F5F5', '#7e7e7e', '#EEEEEE', '#212121', '#616161', '#7e7e7e'];
  return bgcolors[indexNum % bgcolors.length];
}

const getColor = function(indexNum) {
  var colors = ['#000', '#000', '#000', '#fff', '#fff', '#000'];
  return colors[indexNum % colors.length];
}

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

  return {
    left: sPos[0] + "%",
    top: sPos[1] + "%",
    right: (isLast ? "0" : sPos[2]) + "%",
    bottom: (isLast ? "0" : sPos[3]) + "%",
    backgroundColor: getBackgroundColor(indexNum),
    color: getColor(indexNum),
  };
}

window.setPageBackground = function(indexNum) {
  const mainComponent = document.getElementsByTagName('main')[0];
  mainComponent.style.color = getColor(indexNum);
  mainComponent.style.backgroundColor = getBackgroundColor(indexNum);

  const menuFooter = document.getElementsByClassName('menu-footer')[0];
  menuFooter.style.boxShadow = '2px 2px 5px' + getColor(indexNum);
}

window.hideFooter = function (hide) {
  var footer = document.getElementsByClassName('footer')[0];
  var classes = footer.className.split(' ');

  if (hide) {
    classes.push('invisible');
  } else {
    var index = classes.indexOf("invisible");
    if (index >= 0) {
      classes.splice( index, 1 );
    }
  }
  footer.className = classes.join(' ');
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
