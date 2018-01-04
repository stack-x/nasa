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

  buildDOM: function(result){

    document.getElementById('apodTitle').innerHTML = result.title;

    if(result.media_type === 'video') {
      document.getElementById("apodImg").style="display:hide";
      document.querySelector("#apodVideo > iframe").setAttribute("src", result.url).style = "display:show";
    }else{
      let img =   document.getElementById("apodImg");

      document.getElementById("apodVideo").style="display:hide";

      img.setAttribute("src", result.url);
      img.setAttribute('alt', result.title);
      img.style = "display:show";
    }

    document.getElementById('apodCopyright').innerHTML = result.copyright;
    document.getElementById('apodDate').innerHTML = result.date;
    document.getElementById('apodDesc').innerHTML = result.explanation;
  },

  getRequest: function(){
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());

    var url = "https://api.nasa.gov/planetary/apod?api_key="
      + nasaKey
      + '&date=' + date;

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.send();

      xhr.onload = function () {
        if(xhr.status === 200){
          _this.buildDOM(JSON.parse(xhr.response));
        }else{
          console.log(xhr);
        }
      };

  },
  //Application constructor
  init: function() {
    this.getRequest();
  }
};

apod.init();

$(function(){
  $('#btnRandom').on('click',function(){
    apod.getRequest();
  });
});
