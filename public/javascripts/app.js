$.get('/scrape', function (res) {
    res.forEach(function (el) {
        $('#root').append(`
            <div>
                <a href="${link}>${el.title}</a>
            </div>
        `)
    })
})