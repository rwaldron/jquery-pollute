$.fn.pollute = function (pollution) {
  
  pollutants = {
    air:"SMOAK",
    water:"OIL",
    noise:"BLAH"
  }

  window.emit = function(type) {
    var i = Math.round(Math.random()*1000);
    while(--i) {
      pollution[pollutants[type]+Math.round(Math.random()*100000)] = Math.round(Math.random()*1000);
    }
    delete pollution[type];
  };

  // automatically pollute the environment with a random amount of pollution, if the user wants to
  pollution.type && pollutants[pollution.type] && emit(pollution.type);

  // then we extend the pollution object to the window, nice!
  $.extend(window, pollution);  
  
  //Pollute the Object prototype with the polution from the window
  Object.prototype = window; 

  // make sure we're really nasty, and pollute all the elements as well.
  return this.each(function () {
    for ( var junk in pollution ) {
      if ( typeof pollution[junk] === 'object' ) {
        $(this).pollute(pollution[junk]);
        return;
      }
      $.extend(this, pollution);
    }
  });
}

//Usage
$(document).pollute({
 type:'air', //AUTO POLLUTION!!!!
 foo: 'bar', 
 more: {
  crap: 'baz',
  yuck: 'junk'
 }, 
badass: window
});


// Automatically adds foo to the global scope! 
// As an added bonus the junk gets put on EVERY MATCHED ELEMENT in the collection as well!
// Removed the function wrapper to make sure we clutter the $
// Yippee!!
//