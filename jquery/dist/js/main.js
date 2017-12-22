//console.log(nasaKey);

var apod = {
  //Create a random apodDate
  randomDate: function(start, end) {
    let date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    //Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    if(m < 10){
      m = '0' + m;
    }

    if(d < 10){
      d = '0' + d;
    }

    return `${y}-${m}-${d}`;

  },

  //Application constructor
  init: function() {
    let date = this.randomDate(new Date(1995, 5, 16), new Date());

    var url = "https://api.nasa.gov/planetary/apod?api_key="
      + nasaKey
      + '&date=' + date;

    $.ajax({
      url:url
    }).done(function(result){

      $('#apodTitle').text(result.title);

      if(result.media_type === 'video') {
        $("#apodImg").hide();
        $("#apodVideo > iframe").attr("src", result.url).show();
      }else{
        $("#apodVideo").hide();
        $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
      }

      $('#apodCopyright').text(result.copyright);
      $('#apodDate').text(result.date);
      $('#apodDesc').text(result.explanation);

    }).fail(function(result){
      console.log(result);
    });

  }
};

apod.init();
