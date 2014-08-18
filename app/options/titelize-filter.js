Options.filter('titelize', function () {

  return function (input, arg) {

    var words = input.split('_');
    var array = [];

    for (var i=0; i<words.length; ++i) {
      array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1));
    }

    return array.join(' ');

  };
});
