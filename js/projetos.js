
$(document).ready(function(){

        
        var projectsData = [];
        $.getJSON('json/projects.json',function(data){
           //console.log(data);
           projectsData = data.projects;
           var element = null;
            $(data.projects).each(function(index,value){
                        //console.log(value.title);
                         element = $('<div class="col-md-4 col-sm-6 portfolio-item" id="project-'+index+'">'
                                                +'<a href="" class="portfolio-link" data-toggle="modal">'
                                                +'<div class="portfolio-hover">'
                                                +'<div class="portfolio-hover-content">'
                                                +'<i class="fa fa-plus fa-3x"></i>'
                                                +'</div>'
                                                +'</div>'
                                                +'<img src="'+value.image+'" class="img-responsive" alt="">'
                                                +'</a>'
                                                +'<div class="portfolio-caption">'
                                                +'<h4>'+value.tipo+'</h4>'  
                                                +'</div>'
                                                +'</div>'


                            );
                         element.on('click', onClickProject);
                         $('.porto').append(element);
               
                        
                });
        });

        function onClickProject(event){
            
            var id = event.currentTarget.id;
            id = id.substring(id.indexOf('-')+1, id.length);

            console.log('on click ', event.currentTarget.id, id);
            $("#portfolioModal").css('display', 'block');
            console.log(projectsData[id]);

            var projeto = projectsData[id]; 

            $("#image1").attr('src',projeto.image);
 

        }

        $('#close').on('click', onCloseProject);

        function onCloseProject(event){

             $("#portfolioModal").css('display', 'none');
             console.log("ola");

        }



        /*$.getJSON('json/projects.json',function(data){
           //console.log(data);
            $(data.projects).each(function(index,value){
                        //console.log(value.title);
                         $('.modale').append(  


                            );
               
                        
                });
        });*/

})     
        


