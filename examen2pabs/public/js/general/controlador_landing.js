// let botonIngresar =  document.querySelector('#btnIngresar');
// botonIngresar.addEventListener('click',ocultarBoton);

// let botonSalir = document.querySelector('#btnSalir');
// botonSalir.addEventListener('click',ocultarBoton);
// // botonSalir.classList.add('ocultar'); //lo hice directo en el html y css como una clase, pero también puede ser de esta manera, lo ùnico que pasaría es que por alguna micronésima de segundo, podría ser que el botón se vea

// function ocultarBoton(){
//     botonIngresar.classList.add('ocultar');  
//     botonSalir.classList.remove('ocultar'); 
// }

// function obtenerPagina(url){   
//     $.ajax({
//         url : 'http://localhost:4000/api/obtenerPagina',
//         type : 'get',
//         data:{
//             url: url                     
//         },
//         contentType : 'application/x-www-form-urlencoded; charset=utf-8',
//         dataType : 'html',
//         async : false,
//       })
//       .done(function(response){
//         $('#contenedorPrincipal').html(response);
//       })
//       .fail(function(xhr, status){
//         $('#contenedorPrincipal').html('Error');
//       });

// }

// function moverContenedorPricipal(){
//       // para que el contenedor principal se mueva según se muevan las barras del menú
//       let contenedorPrincipal = document.querySelector('#contenedorPrincipal');

//       if (contenedorPrincipal != undefined) {
//           contenedorPrincipal.classList.remove('CPpositionOn');
//           contenedorPrincipal.classList.add('CPpositionOff');
//       }

// }


// function init(jQuery) {
//     homeAnimations();
// }

// function homeAnimations() {
// 	var goDown  					= $('#go-down'),
// 		goAbout							= $('#go-about'),
// 		goServices					= $('.go-services'),
// 		goProjects					= $('.go-projects'),
// 		goMetodology				= $('#go-metodology'),
// 		goPress     				= $('#go-press'),
// 		goContact						= $('#go-contact'),
// 		homeAboutAnimee 		= $('#home-about-animee'),
// 		homeServicesAnimee1 = $('#home-services-animee1'),
// 		homeServicesAnimee2 = $('#home-services-animee2'),
// 		homeProjectsAnimee1 = $('#home-projects-animee1'),
// 		homeProjectsAnimee2 = $('#home-projects-animee2');

			

// 	goDown.on('click', function() {
// 		$('html, body').animate({ scrollTop: 705 }, 500);
// 	});

// 	goAbout.on('click', function() {
// 		$('html, body').animate({ scrollTop: 705 }, 500);
// 	});

// 	goServices.on('click', function() {
// 		$('html, body').animate({ scrollTop: 1408 }, 500);
// 	});

// 	goProjects.on('click', function() {
// 		$('html, body').animate({ scrollTop: 2120 }, 500);
// 	});

// 	goMetodology.on('click', function() {
// 		$('html, body').animate({ scrollTop: 2875 }, 500);
// 	});

// 	goPress.on('click', function() {
// 		$('html, body').animate({ scrollTop: 3575 }, 500);
// 	});

// 	goContact.on('click', function() {
// 		$('html, body').animate({ scrollTop: 6000 }, 500);
// 	});



// 	$(window).on('scroll', function() {
// 		var scroll = $(window).scrollTop();
// 		if(scroll >= 340) homeAboutAnimee.show().addClass('animated slideInRight');
// 		if(scroll >= 1020) {
// 			homeServicesAnimee1.show().addClass('animated slideInLeft');
// 			homeServicesAnimee2.show().addClass('animated slideInRight');
// 		}
// 		if(scroll >= 1800) homeProjectsAnimee1.show().addClass('animated fadeIn');
// 		if(scroll >= 1900) homeProjectsAnimee2.show().addClass('animated fadeIn');
// 		if(scroll > 3800) $(window).off();
// 	});
// }

// $(document).ready(init);
