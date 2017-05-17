const getBackgroundColor = function(indexNum) {
  var bgcolors = ['transparant', 'transparant', 'transparant', 'transparant', 'transparant', 'transparant'];
  return bgcolors[indexNum % bgcolors.length];
}

const getBackgroundImage = function(indexNum) {
  var bgimage = ['url(http://dynamikfabrikken.com/img/bg.png)', 'url(http://dynamikfabrikken.com/img/bg.png)', 'url(http://dynamikfabrikken.com/img/bg.png)', 'url(http://dynamikfabrikken.com/img/bg.png)', 'url(http://dynamikfabrikken.com/img/bg.png)', 'url(http://dynamikfabrikken.com/img/bg.png)'];
  return bgimage[indexNum % bgimage.length];
}

const getColor = function(indexNum) {
  var colors = ['#414042', '#414042', '#414042', '#414042', '#414042', '#414042'];
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
    backgroundImage: getBackgroundImage(indexNum),
    color: getColor(indexNum),
  };
}

window.setPageBackground = function(indexNum) {
  const mainComponent = document.getElementsByTagName('main')[0];
  mainComponent.style.color = getColor(indexNum);
  mainComponent.style.backgroundColor = getBackgroundColor(indexNum);
  mainComponent.style.backgroundImage = getBackgroundImage(indexNum);

  const menuFooter = document.getElementsByClassName('menu-footer')[0];
  //menuFooter.style.boxShadow = '2px 2px 5px' + getColor(indexNum);
}

window.hideFooter = function (hide) {
  var footer = document.getElementsByClassName('footer')[0];
  var classes = footer.className.split(' ');

  if (hide && classes.indexOf('invisible') === -1) {
    classes.push('invisible');
  } else {
    var index = classes.indexOf("invisible");
    if (index >= 0) {
      classes.splice( index, 1 );
    }
  }
  footer.className = classes.join(' ');
}

window.hideAbout = function (hide) {
  const aboutComponent = document.getElementsByClassName('about')[0];
  var classes = aboutComponent.className.split(' ');

  if (hide) {
    classes.push('invisible');
  } else {
    var index = classes.indexOf("invisible");
    if (index >= 0) {
      classes.splice( index, 1 );
    }
  }
  aboutComponent.className = classes.join(' ');
}

let aboutAnimationStep = 0;
let aboutAnimationInProgress = false;

var applyAboutStyle = function () {
  const parentPage = document.getElementsByClassName('blue-green')[0];
  const whitePart = document.getElementsByClassName('white-part')[0];
  const blackPart = document.getElementsByClassName('black-part')[0];
  const width = whitePart.offsetWidth;
  const height = whitePart.offsetHeight / 2;
  const p1 = {
    x: (width - 100) - (width / 2 - 100) / 100 * aboutAnimationStep,
    y: 0
  };
  const q1 = p1;
  let p2, p3, p4;
  let q2, q3, q4;
  const angle = (45 / 100 * aboutAnimationStep + 45) * Math.PI / 180;
  if ((width - p1.x) * Math.tan(angle) < height) {
    p2 = q2 = p3 = q3 = {
      x: width,
      y: (width - p1.x) * Math.tan(angle)
    };
  } else {
    p2 = q2 = {
      x: p1.x + ((angle === Math.PI / 2) ? 0 : height / Math.tan(angle)),
      y: height
    };
    p3 = {
      x: width - (width - p2.x) * Math.sin(angle) * 2 * Math.sin(angle),
      y: height + (width - p2.x) * Math.sin(angle) * 2 * Math.cos(angle)
    };
    q3 = {
      x: width,
      y: height
    };
  }
  p4 = {
    x: width - (width - p1.x) * Math.sin(angle) * 2 * Math.sin(angle),
    y: (width - p1.x) * Math.sin(angle) * 2 * Math.cos(angle)
  };
  q4 = {
    x: width,
    y: 0,
  };
  whitePart.style.clipPath = 'polygon(' + p1.x + 'px ' + p1.y + 'px, ' + p2.x + 'px ' + p2.y + 'px, ' + p3.x + 'px ' + p3.y + 'px, ' + p4.x + 'px ' + p4.y + 'px)';
  blackPart.style.clipPath = 'polygon(' + q1.x + 'px ' + q1.y + 'px, ' + q2.x + 'px ' + q2.y + 'px, ' + q3.x + 'px ' + q3.y + 'px, ' + q4.x + 'px ' + q4.y + 'px)';
  const size = (aboutAnimationStep - 50) * (aboutAnimationStep - 50) / 10000 + 0.75;
  parentPage.style.height = '100%';
  parentPage.style.transform='scale(' + size + ')';
  document.getElementsByTagName('body')[0].style.backgroundColor = 'black';
}

const applyOpenStyle = function() {
  const whitePart = document.getElementsByClassName('white-part')[0];
  const blackPart = document.getElementsByClassName('black-part')[0];
  whitePart.style.clipPath = 'polygon(0 0, 0 100%, 50% 100%, 50% 0%)';
  blackPart.style.clipPath = 'polygon(50% 0, 50% 100%, 100% 100%, 100% 0%)';
}

const applyCloseStyle = function() {
  const whitePart = document.getElementsByClassName('white-part')[0];
  const blackPart = document.getElementsByClassName('black-part')[0];
  whitePart.style.clipPath = 'polygon(calc(100% - 100px) 0, calc(100% - 100px) 100px, 100% 100px, 100% 100px)';
  blackPart.style.clipPath = 'polygon(calc(100% - 100px) 0, 100% 100px, 100% 100px, 100% 0)';
}

window.openAbout = function () {
  window.hideFooter(true);
  applyAboutStyle();
  aboutAnimationStep += 1;
  aboutAnimationInProgress = true;
  window.aboutOpen = true;
  if (aboutAnimationStep < 101)
  {
    setTimeout(window.openAbout, 10);
  } else {
    const menuFooter = document.getElementsByClassName('menu-footer')[0];
    menuFooter.style.zIndex = 3;
    aboutAnimationInProgress = false;
    aboutAnimationStep = 100;
    applyOpenStyle();
  }
}

window.closeAbout = function() {
  const menuFooter = document.getElementsByClassName('menu-footer')[0];
  menuFooter.style.zIndex = 1;
  applyAboutStyle();
  aboutAnimationStep -= 1;
  aboutAnimationInProgress = true;
  window.aboutOpen = false;
  if (aboutAnimationStep > -1)
  {
    setTimeout(window.closeAbout, 10);
  } else {
    aboutAnimationInProgress = false;
    aboutAnimationStep = 0;
    applyCloseStyle();
    window.hideFooter(false);
  }
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
    size = 40;
  }
  $('html').css('font-size', size + "%");
}
