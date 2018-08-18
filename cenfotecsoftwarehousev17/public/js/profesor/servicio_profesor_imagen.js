


let imagenUrl = '';

$(function () {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'dyrhofccj', api_key: '197828935125463' });

    // Upload button
    let uploadButton = $('#btnSeleccionarImagen');

    // Upload button event
    uploadButton.on('click', function (e) {
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'dyrhofccj', upload_preset: 'proyecto1Personal', tags: ['cgal'] },
            function (error, result) {
                if (error) console.log(error);
                // If NO error, log image data to console
                let id = result[0].public_id;
                console.log(id);
                imagenUrl = 'https://res.cloudinary.com/dyrhofccj/image/upload/' + id;
                //imagenUrl = processImage(id);
                console.log(imagenUrl);
                document.querySelector('#txtImagen').src = imagenUrl;
                return imagenUrl;
            });
    });
})

// Revisar despues
function processImage(id) {
    let options = {
        client_hints: true,
    };
    return $.cloudinary.url(id, options);
}
