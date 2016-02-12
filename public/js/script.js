$(document).ready(function(){
  arrangeGrid();
});

function arrangeGrid2(){
  var ratioRt = 316/640*100;
  var ratioSq = 100;
  $('.category').each(function(){
    var width = $(this).width();
    var isSquare = $(this).css('background-image').indexOf('_sq.') > -1;
    var setWidth = (isSquare) ? ratioSq : ratioRt;
    $(this).css('padding-top', setWidth + '%');
    // $('.label', this).css('margin-top', '-' + pTop/1.75 + '%');
  });
}

function arrangeGrid(){
  var ratioRt = 316/640;
  var ratioSq = 1;
  $('.category').each(function(){
    var width = $(this).width();
    var isSquare = $(this).css('background-image').indexOf('_sq.') > -1;
    var setWidth = (isSquare) ? ratioSq * width : ratioRt * width;
    $(this).css('height', setWidth + 'px');
    // $('.label', this).css('margin-top', '-' + pTop/1.75 + '%');
  });
}
