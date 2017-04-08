window.getStyle = function (indexNum, isLast) {
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
  var colors = ['#ff8888', '#ffff88', '#ffffff', '#88ff88', '#88ffff', '#8888ff'];
  return {
    left: sPos[0] + "%",
    top: sPos[1] + "%",
    right: (isLast ? "0" : sPos[2]) + "%",
    bottom: (isLast ? "0" : sPos[3]) + "%",
    backgroundColor: colors[indexNum % colors.length]
  };

}
