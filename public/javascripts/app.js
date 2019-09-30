$.get('/scrape', function (res) {
    res.forEach(function (el) {
        $('#root').append(`
            <div>
                <a href="${el.link}>${el.title}</a>
            </div>
        `)
    })
})