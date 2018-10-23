$(() => {
    $('#accordion').accordion({
        collapsible: true,
        heightStyle: 'content'
    });

    $('#zadatak1 input.input').on('input', () => $('#zadatak1 input.output').val(getMax($('#numberA').val(), $('#numberB').val())));
    $('#zadatak2 input.input').on('input', () => $('#zadatak2 input.output').val(getMaxArr($('#zadatak2 input.input').val().split(/[, *]/))));
    $('#zadatak3 input.input').on('input', () => $('#zadatak3 textarea.output').val(stringSpam($('#stringIn').val(), $('#numIn').val())));
    $('#zadatak4 input.input').on('input', () => {
        let v = sentencing($('#sentence').val());
        $('#wordCount').val(v.words);
        $('#maxWord').val(v.lWord);
        $('#minWord').val(v.sWord);
    });
    $('#zadatak5 input.input').on('input', () => $('#zadatak5 .output').append(whoAmI($('#firstName').val(), $('#lastName').val(), $('#hairColor').val(), $('#age').val())));
    $('#zadatak6 input.input').on('input', () => $('#niceSentence').val(censorship($('#naughtySentence').val())));
    $('#zadatak7 input.input').on('input', () => $('#goodSentence').val(advertiserFriendly($('#badSentence').val(), $('#badWords').val() ? $('#badWords').val().split(/, *| +/) : [])));
    $('#zadatak8').append($('<div>', {
        'text': `Hello! My width and height are exactly 50% of the window's width and height`,
        'id': 'quarterWindow',
        'style': `background-color: pink;
            box-shadow: 0 0 3px #adadad, 2px 2px 3px #adadad;
            width: ${$(window).width() / 2}px;
            height: ${$(window).height() / 2}px;
            text-align: center;
            position: absolute;
            z-index: 999;`
    }).draggable());
    $(window).resize(() => $('#quarterWindow').css({ 'width': `${$(window).width() / 2}px`, 'height': `${$(window).height() / 2}px` }));
    $('#zadatak9 input.input').on('input', () => $('#zadatak9 textarea.output').val($('#toCapitalize').val().toUpperCase()));

    $('input[type=submit]').button({
        icon: 'ui-icon-arrowrefresh-1-e'
    }).click(e => {
        e.preventDefault();
        $(e.target).parent('form')[0].reset();
    });
});

// Zadatak 1
let getMax = (a, b) => Math.max(a, b),

    getMaxArr = nums => {
        for (n of nums)
            if (typeof parseInt(n.trim()) !== 'number') return false;
        return Math.max(...nums);
    },
    stringSpam = (s, n) => {
        let output = '';
        for (let i = 0; i < n; i++) {
            output += s + '\n';
        }
        return output;
    },

    sentencing = s => {
        let words = s.replace(/[.!\?:;'"\(\)\/]+/g, ' ').trim().split(/, *| +/),
            wlens = {};
        for (w of words)
            if (w.length > 0) wlens[w.length] = w;
        return {
            words: words.length,
            lWord: wlens[Math.max(...Object.keys(wlens))],
            sWord: wlens[Math.min(...Object.keys(wlens))]
        };
    },

    whoAmI = (fName, lName, hColor, age) => {
        $('#person').slideUp('fast').remove();
        return $('<table>', { 'id': 'person' }).append(
            $('<tr>').append(
                $('<td>', { 'text': 'Ime' }),
                $('<td>', { 'text': fName })
            ),
            $('<tr>').append(
                $('<td>', { 'text': 'Prezime' }),
                $('<td>', { 'text': lName })
            ),
            $('<tr>').append(
                $('<td>', { 'text': 'Boja Kose' }),
                $('<td>', { 'text': hColor })
            ),
            $('<tr>').append(
                $('<td>', { 'text': 'Starost' }),
                $('<td>', { 'text': age })
            ),
            $('<tr>').append(
                $('<td>', { 'text': 'Mladost' }),
                $('<td>', { 'text': (100 - age) })
            )
        );

    },

    censorship = (naughtySentence) => {
        return naughtySentence.replace(/grom|pakao/gi, '***');
    },

    advertiserFriendly = (badSentence, badWords) => {
        console.log(badWords);
        badWords.push('grom', 'pakao');
        console.log(badWords);
        return badSentence.replace(new RegExp(badWords.join('|'), 'gi'), '***');
    };