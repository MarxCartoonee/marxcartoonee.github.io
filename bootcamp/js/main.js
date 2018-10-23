$(() => {
    // getData('users', userSelect);
    fetchData('users', undefined, userSelect)
});

let fetchData = (content, data = {}, callback) => {
    fetch(`https://jsonplaceholder.typicode.com/${content}?${$.param(data)}`)
        .then(re => new Promise(resolve => resolve(re.json())))
        .then(re => callback(re))
        .catch(err => console.error(err.message));
}

let getData = (dataType, callback, filters = {}) => {
    $.ajax({
        url: `
        https: //jsonplaceholder.typicode.com/${dataType}`,
        data: filters,
        method: 'GET',
        dataType: 'json'
    }).done((data, status, xhr) => {
        if (data.length > 0) callback(data);
    }).fail((xhr, status, msg) => {

    });
}

function userSelect(users) {
    $('<label>', { 'for': 'user-select', 'text': 'Select User' }).appendTo($('body'));
    const dropDown = $('<select>', { 'id': 'user-select' }).change(e => fetchData('posts', { 'userId': $(e.target).val() }, showPosts)).append($('<option>', { 'text': 'Select User' })).appendTo($('body'));
    for (u of users) $('<option>', { 'value': u.id, 'text': u.name }).appendTo(dropDown);
}

function showPosts(posts) {
    if ($('#posts')) $('#posts').remove();
    const postList = $('<dl>', { 'id': 'posts' }).appendTo($('body'));
    for (p of posts) {
        postList.append(
            $('<dt>', { 'text': p.title, 'id': `post-id-${p.id}` }),
            $('<dd>', { 'text': p.body }).append(
                $('<a>', { 'text': 'Show comments', 'href': `posts/${p.id}/comments` })
            ).hide(),
            $('<hr>'));
    }

    $('dt').click(e => $(e.target).next().slideToggle());
    $('dd > a').click(e => toggleComments(e, true))
}

function getComments(comments) {
    let cBox = $('<div>', { 'id': `comments-${comments[0].postId}` });
    $(`#post-id-${comments[0].postId}`).next('dd').append(cBox.hide());
    for (c of comments) {
        cBox.append(
            $('<div>', { 'id': `comment-${c.id}` }).append(
                $('<a>', { 'href': `mailto:${c.email}`, 'text': c.name }),
                $('<p>', { 'text': c.body })
            )
        );
    }

    cBox.slideDown('fast').prev('a').click(e => toggleComments(e, false));
}

function toggleComments(e, b) {
    console.log(e, b);
    e.preventDefault();
    if (b) fetchData($(e.target).attr('href'), undefined, getComments);
    else $(e.target).click(e => toggleComments(e, true)).next().slideUp('fast').remove();
    $(e.target).text(`${ b ? 'Hide' : 'Show'} comments`);
}