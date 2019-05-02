var PRODUCT_CONTENT_TYPE_ID = 'projects';
let projects = [];

const months = {
  janeiro: 0,
  fevereiro: 1,
  'março': 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
}

$(function() {
  var contentfulClient = contentful.createClient({
    accessToken: '858fb61e7fa2e69045356b3eb54f7267a995f3a33fbdb89362045c1b3f2e350b',
    space: '5nkoa97tjmls'
  });
  contentfulClient.getEntries({
      content_type: PRODUCT_CONTENT_TYPE_ID
    })
    .then(function(entries) {
      for(var i=0; i<entries.items.length; i++){
        const { title, subcategory, description, date, category, mediaImg, blogImages, blog } = entries.items[i].fields;
        const data = {
          title,
          category,
          subcategory,
          description,
          ptdate: date,
          mediaImg,
          blogImages,
          blog,
        };
        const month = date.toLowerCase().substring(0, date.indexOf(' '));
        const year =  date.substring(date.indexOf(' ') + 1, date.length);
        const formatDate =  new Date(year, months[month]);
        data.date = formatDate;
        if(category === 'arquitectura' && window.location.pathname.indexOf('arquitecture') !== -1){
          projects.push(data);
        }else if(category === 'design' && window.location.pathname.indexOf('design') !== -1){
          projects.push(data);
        }else if(category === 'urbanismo' && window.location.pathname.indexOf('urbanism') !== -1){
          projects.push(data);
        }else{

        }
      }

      projects.sort(function(a,b){return b.date.getTime() - a.date.getTime()});

      projects.map((value, index) => {
        $('#project-name').text(value.title);
        let image = value.blogImages ? value.blogImages[0] : value.mediaImg ? value.mediaImg[0].fields.file.url : '';
        if(image && image.indexOf('https:') === -1) image = image.replace("http:", "https:");
        $('#project-img').attr('src', image);

        if(value.subcategory.toLowerCase() === 'arquitectura-comercial'){
            appendItem($('.arquitectura-comercial'), index, image, value.title);
        }else if(value.subcategory.toLowerCase() === 'arquitectura-concursos'){
            appendItem($('.arquitectura-concursos'), index, image, value.title);
        }else if(value.subcategory.toLowerCase() === 'arquitectura-habitacional'){
            appendItem($('.arquitectura-habitacional'), index, image, value.title);
        }

        if(value.subcategory.toLowerCase() === 'concursos-design'){
            appendItem($('.design-concursos'), index, image, value.title);
        }else if(value.subcategory.toLowerCase() === 'interiores'){
            appendItem($('.design-interiores'), index, image, value.title);
        }else if(value.subcategory.toLowerCase() === 'logotipos'){
            appendItem($('.design-logotipos'), index, image, value.title);
        }else if(value.subcategory.toLowerCase() === 'mobiliario'){
            appendItem($('.design-mobiliario'), index, image, value.title);
        }

        if(value.category.toLowerCase() === 'urbanismo'){
          if(image){
            appendItem($('.porto'), index, image, value.title);
          }else{
            appendItem($('.porto'), index, '', value.title);
          }
        }
      });


    })
});

function appendItem(object, index, image, title){
     object.append('<div class="portfolio-item" id="item-'+index+'">'
        +'<a href="#portfolioModal" onclick="javascript:openModal('+index+');" class="portfolio-link" data-toggle="modal">'
            +'<div class="portfolio-hover">'
                +'<div class="portfolio-hover-content">'
                +  '<div class="portfolio-plus">ver <i class="fa fa-plus"></i></div>'
                +'</div>'
            +'</div>'
            + '<div class="image" style="background-image: url(' + image + ')"></div>'
        +'</a>'
        +'<div class="portfolio-caption">' + title + '</div>'
    +'</div>');
}

function openModal(index){
    $('#project-name').text(projects[index].title);
    $('.thumbnails').empty();
    $('#project-description').empty();
    $('#project-date span').empty();

    const images = projects[index].blogImages ? projects[index].blogImages : projects[index].mediaImg;
    if(images){
      let first = projects[index].blogImages ? projects[index].blogImages[0] : projects[index].mediaImg[0].fields.file.url;
      if(first && first.indexOf('https:') === -1) first = first.replace("http:", "https:");
      $('#img').css('background-image', 'url(' + first + ')');
      if(images.length > 1){
        for(var i=0; i < images.length; i++){
          const url = projects[index].blogImages ? projects[index].blogImages[i] : projects[index].mediaImg ? projects[index].mediaImg[i].fields.file.url : '';
          if(url && url.indexOf('https://') === -1) url.replace("http://", "https://");
          $('.thumbnails').append('<img onmouseover="javascript:showPreview(' + index + ',' + i + ');" id="img'+i+'" src="'+url+'" />');
        }
      }
    }else{
    }
    if(projects[index].blog){
      $('#seemore').attr('href', projects[index].blog);
    }else{
      $('#seemore').css('display', 'none');
    }

    $('#project-description').html(projects[index].description);
    $('#project-date span').text(' ' + projects[index].ptdate);
    if(projects[index].location !== undefined && projects[index].location !== ''){
        $('#project-location span').text(' ' + projects[index].location);
        $('#project-location').css('display', 'block');
    }else{
        $('#project-location').css('display', 'none');
    }

}
function showPreview(index, image){
    let url = projects[index].blogImages ? projects[index].blogImages[image] : projects[index].mediaImg ? projects[index].mediaImg[image].fields.file.url : '';
    if(url && url.indexOf('https:') === -1) url = url.replace("http:", "https:");
    $('#img').css('background-image', 'url("")');
    $('#img').css('background-image', 'url(' + url + ')');
}
