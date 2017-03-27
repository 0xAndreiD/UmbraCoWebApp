function buildcontenthtml(j){
  var s = "<div>";

  if (j) {
      //if one col
      if (Object.keys(j.sections).length <= 1) {
        for (let i = 0; i < Object.keys(j.sections).length; i++){
          var array = j.sections[i].rows;
          for (let i = 0; i < array.length; i++) {
            s += renderRow(array[i], true);
          }
        }
      }
      else {
        s += "<p>We need to take care of 2-12 col. stuff</p>";
      }
  }
  else {
      s += "<p>EMPTY</p>";
  }

  s += "</div>";

  return s;
}

function renderRow(row, singleColumn) {

  var rowhtml = "";

  rowhtml += "<div " + RenderElementAttributes(row) + ">";
  if (singleColumn) {
    rowhtml += "<div class='container'>";
  }
  rowhtml += "<div class='row'>";
    for (let i = 0; i < row.areas.length; i++) {
      rowhtml += "<div class='col s" + row.areas[i].grid + "'>";
      rowhtml += "<div " + RenderElementAttributes(row.areas[i]) + ">";

      for (let e = 0; e < row.areas[i].controls.length; e++) {
          var control = row.areas[i].controls[e];
          if (control != null && control.editor != null && control.editor.view != null) {
            //console.log(control);
            //console.log(control.editor);
            //console.log(control.editor.view);
            rowhtml += editorview(control);
          }
      }

      rowhtml += "</div>";
      rowhtml += "</div>";
    }
  rowhtml += "</div>";
  if (singleColumn) {
    rowhtml += "</div>";
  }
  rowhtml += "</div>";

  return rowhtml;
}


function RenderElementAttributes(contentItem){
  var r = "";

  var cfg = contentItem.config;
  if (typeof cfg !== "undefined"){
    Object.keys(cfg).forEach(function (key) {
        r += key + "='" + cfg[key].toLowerCase().replace(" ", "-") + "'";
    });
  }

  var style = contentItem.styles;
  if (typeof style !== "undefined"){
    r += "style='";
    Object.keys(style).forEach(function (key) {
      if (key == "background-image") {
          style[key] = "url(http://umb.dynamikfabrikken.com" + style[key].replace("url(", "");
      }
      r +=  key + ": " + style[key] + "; ";
    });
    r += "'";
  }

  return r;
}

function editorview(contentItem){
  var e = ""
  var type = contentItem.editor.alias;

  try {
        if (type == "rte") {
        // line 139 - TemplateUtilities.ParseInternalLinks not added
        e += contentItem.value.replace("src=\"/", "src=\"" + "http://umb.dynamikfabrikken.com" + "/");
        }
        else if (type == "macro"){
          var macroalias = contentItem.value.macroAlias;
          if (macroalias == "slider") {
            e += buildslider();
          }
        }
        else{
          console.log(type);
        }
  }
  catch(err) {

  }

  return e;
}

function buildslider(){
  var slider = "";


        slider += "<div materialize='carousel' class='carousel'>";

        slider += "<div class='carousel-fixed-item center'>";
        slider += "<a class='btn waves-effect white grey-text darken-text-2'>button</a>";
        slider += "</div>";

        for (let i = 0; i < 3; i++) {
          slider += "<div class='carousel-item red white-text' href='#" + i + "'>";
          slider += "<h2>First Panel</h2><p class='white-text'>This is your first panel</p>";
          slider += "</div>";
        }

        slider += "</div>";


        slider += "<div appCarouselSpy id='full-carousel' class='carousel carousel-slider center' data-indicators='true'>";
          slider += "<div class='carousel-fixed-item center'>";
              slider += "<a class='btn waves-effect white grey-text darken-text-2'>button</a>";
          slider += "</div>";
          slider += "<div class='carousel-item red white-text' href='#one!'>";
              slider += "<h2>First Panel</h2>";
              slider += "<p class='white-text'>This is your first panel</p>";
          slider += "</div> ";
          slider += "<div class='carousel-item amber white-text' href='#two!'>";
              slider += "<h2>Second Panel</h2>";
              slider += "<p class='white-text'>This is your second panel</p>";
          slider += "</div>";
          slider += "<div class='carousel-item green white-text' href='#three!'>";
              slider += "<h2>Third Panel</h2>";
              slider += "<p class='white-text'>This is your third panel</p>";
          slider += "</div>";
          slider += "<div class='carousel-item blue white-text' href='#four!'>";
              slider += "<h2>Fourth Panel</h2>";
              slider += "<p class='white-text'>This is your fourth panel</p>";
          slider += "</div>";
          slider += "</div>";

  return slider;
}
