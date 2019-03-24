var animalArray = ['lion', 'jaguar', 'tiger', 'leopard', 'cheetah', 'panther']
$('#btn').on('click', function () {
    var inputText = $('input').val()

    function createButton() {
        var newButton = $('<button>')
        var addButton = newButton.text(inputText).addClass('btn');
        $('#myDiv').append(addButton)
    }

    if (inputText == ('')) {
        alert("Enter an animal name")
        $('#myDiv').append(' ')
        $('input').val('');
    } else if (animalArray.toString().toLowerCase().indexOf(inputText.toLowerCase()) != -1) {
        alert("Animal already exists");
        $('input').val('')
    } else {
        animalArray.push(inputText);
        $('input').val('')
        createButton()
        addImage();
    }
});

function addImage() {
    $('.btn').on('click', function () {
        var animal = $(this).text();
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=2VG9Sf6EQJBu6OWde4OdOCUOd27KmIp5&q=" + animal + "&limit=25&offset=0&rating=G&lang=en";
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function (response) {
            $('#gif_images').empty();
            for (var i = 0; i < response.data.length; i++) {
                var addRating = response.data[i].rating;
                var imgUrl = response.data[i].images.fixed_height.url
                var fixed_image = response.data[i].images.original_still.url;
                var newDiv = $('<div>').addClass('newDiv')
                // console.log(newDiv)
                var par = $('<p>')
                var parText = par.text('Rating : ' + addRating)
                var imag = $('<img>').attr('src', imgUrl).css({
                    'width': '300',
                    'height': '300px'
                });
                newDiv.append(parText)
                newDiv.append(imag)
                $('#gif_images').append(newDiv);
            }
            for (var i = 0; i < response.data.length; i++) {
                $('img').each(function (i) {
                    $(this).on('click', function () {
                        var src = $(this).attr("src");
                        console.log(src)
                        if (src == response.data[i].images.fixed_height.url) {
                            $(this).attr('src', response.data[i].images.original_still.url);
                        } else {
                            $(this).attr('src', response.data[i].images.fixed_height.url);
                        }
                    })
                })
            }
        })
    })
}
addImage()