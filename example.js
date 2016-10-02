components.forEach(function(component, index){
   console.log(index);
    $('.lights').append('<div class="light" id="light-'+component.id+'">'
      +'<div class="light-circle-container"><div class="light-circle" id="lightcircle-'+component.id+'"><span class="icon-light-on"></span></div></div>'
      +'<div class="status-container"> '
        +'<div class="light-name"><div>'+component.label+'</div></div>'
        +'<div class="light-status" id="status-'+component.id+'">'
          +'<div class="switch-btn-container">'
            +'<div class="switch-btn switch-on">On</div><div class="switch-btn switch-off">Off</div><div class="switch-btn circle"></div>'
          +'</div>'
        +'</div>'
      +'</div>'
      +'<div class="brigtness-container" id="brightness-'+component.id+'"><div class="mz-slider"><div id="bri-'+component.id+'" class="dragobj"><div class="dragpoint"><i class="icon-maxbrightness"></i></div></div><hr class="line"></div></div>'
    +'</div>'
    </div>');
  });