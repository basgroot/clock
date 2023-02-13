/*

http://diskussion.christians-bastel-laden.de
http://www.leuchtbildshop.net

14:00 es ist zwei uhr             het is twee uur                it's two o'clock
14:05        fünf nach zwei              vijf over twee               five past two
14:10        zehn nach zwei              tien over twee               ten past two
14:15        viertel nach zwei           kwart over twee              quarter past two
14:20        zwanzig nach zwei           * tien voor half drie        twenty past two
14:25        fünf vor halb drei          vijf voor half drie          twenty-five past two
14:30        halb drei                   half drie                    half past two
14:35        fünf nach halb drei         vijf over half drie          twenty-five to three
14:40        zwanzig vor drei            * tien over half drie        twenty to three
14:45        viertel vor drei            kwart voor drie              quarter to three
14:50        zehn vor drei               tien voor drie               ten to three
14:55        funf vor drei               vijf voor drie               five to three
*/

$(function () {
    "use strict";

    var timer,
        displayedMinutes,
        isChildrenTime = true,
        language = 'nl';

    /**
     * Change the language of the clock
     * @param {string} boardId
     * @return {void}
     */
    function changeBoard(boardId) {
        switch (boardId) {
            case 'en':
                language = 'en';
                $('#idClockContent').html(
                    '<span class="es">IT\'S</span>O<span class="m10">TEN</span>UE<br />' +
                    '<span class="m20">TWENTY</span><span class="m5">FIVE</span><br />' +
                    'BAS<span class="m15">QUARTER</span><br />' +
                    '<span class="half">HALF</span>I<span class="past">PAS</span><span class="to past">T</span><span class="to">O</span><br />' +
                    '<span class="h2 h10">T</span><span class="h2">W</span><span class="h1 h2">O</span><span class="h1">N</span><span class="h1 h11">E</span><span class="h11">LEVEN</span><br />' +
                    '<span class="h8 h10">E</span><span class="h8">IGH</span><span class="h3 h8">T</span><span class="h3">HREE</span>N<br />' +
                    '<span class="h10">N</span><span class="h7">SEVE</span><span class="h7 h9">N</span><span class="h9">INE</span>R<br />' +
                    '<span class="h12">TWELVE</span><span class="h4">FOUR</span><br />' +
                    '<span class="h6">SIX</span><span class="h5">FIVE</span>LAS<br />' +
                    'S<span class="h">O\'CLOCK</span>WO<br />');
                break;
            case 'de_orig':
                language = 'de';
                $('#idClockContent').html(
                    // 11x10:
                    '<span class="es">ES</span>K<span class="ist">IST</span>A<span class="m5">FÜNF</span><br />' +
                    '<span class="m10">ZEHN</span><span class="m20">ZWANZIG</span><br />' +
                    'DREI<span class="m15">VIERTEL</span><br />' +
                    '<span class="to">VOR</span>FUNK<span class="past">NACH</span><br />' +
                    '<span class="half">HALB</span>A<span class="h11">EL</span><span class="h5 h11">F</span><span class="h5">ÜNF</span><br />' +
                    '<span class="h1">EINS</span>BAS<span class="h2">ZWEI</span><br />' +
                    '<span class="h3">DREI</span>AUJ<span class="h4">VIER</span><br />' +
                    '<span class="h6">SECHS</span>NL<span class="h8">ACHT</span><br />' +
                    '<span class="h7">SIEBEN</span><span class="h12">ZWÖLF</span><br />' +
                    '<span class="h10">ZEH</span><span class="h9 h10">N</span><span class="h9">EUN</span>K<span class="h">UHR</span><br />');
                break;
            case 'de_small':
                language = 'de';
                $('#idClockContent').html(
                    // 11x9:
                    '<span class="es">ES</span>B<span class="ist">IST</span>O<span class="m10">ZEHN</span><br />' +
                    '<span class="m5">FÜNF</span><span class="m15">VIERTEL</span><br />' +
                    '<span class="m20">ZWANZIG</span>E<span class="to">VOR</span><br />' +
                    'GE<span class="past">NACH</span>I<span class="half">HALB</span><br />' +
                    'I<span class="h6">S</span><span class="h3">DR</span><span class="h1 h3">EI</span><span class="h1">NS</span><span class="h11">ELF</span><br />' +
                    'Z<span class="h6">E</span>H<span class="h9">NEUN</span><span class="h2">ZWEI</span><br />' +
                    '<span class="h8">A</span><span class="h6 h8">C</span><span class="h8">HT</span>BAS<span class="h4">VIER</span><br />' +
                    'A<span class="h6">H</span><span class="h12">ZWÖL</span><span class="h5 h12">F</span><span class="h5">ÜNF</span>E<br />' +
                    'O<span class="h6 h7">S</span><span class="h7">IEBEN</span>K<span class="h">UHR</span><br />');
                break;
            case 'nl_orig':
                language = 'nl';
                $('#idClockContent').html(
                    // 11x10:
                    '<span class="es">HET</span>K<span class="ist">IS</span>A<span class="m5">VIJF</span><br />' +
                    '<span class="m10">TIEN</span><span class="m20">TWINTIG</span><br />' +
                    'DRIE<span class="m15">KWART</span>EL<br />' +
                    '<span class="to">VOOR</span>ENE<span class="past">OVER</span><br />' +
                    '<span class="half">HALF</span>A<span class="h11">ELF</span><span class="h1">EEN</span><br />' +
                    '<span class="h5">VIJF</span>BAS<span class="h2">TWEE</span><br />' +
                    '<span class="h3">DRIE</span>AUJ<span class="h4">VIER</span><br />' +
                    '<span class="h9">NEGEN</span>ER<span class="h8">ACHT</span><br />' +
                    '<span class="h7">ZEVEN</span><span class="h12">TWAALF</span><br />' +
                    '<span class="h10">TIEN</span><span class="h6">ZES</span>K<span class="h">UUR</span><br />');
                    break;
            case 'nl_small':
                language = 'nl';
                $('#idClockContent').html(
                    // 10x9:
                    '<span class="es">HET</span>K<span class="ist">IS</span>SBAS<br />' +
                    'KO<span class="m10">TIEN</span><span class="m5">VIJF</span><br />' +
                    '<span class="m15">KWART</span>H<span class="past">OVER</span><br />' +
                    '<span class="to">VOOR</span>E<span class="half">HALF</span>U<br />' +
                    '<span class="h8">ACH</span><span class="h8 h10">T</span><span class="h10">IEN</span><span class="h11">ELF</span><br />' +
                    '<span class="h6 h7">Z</span><span class="h7">EVEN</span><span class="h3">DRIE</span>U<br />' +
                    '<span class="h6">E</span><span class="h2">TW</span><span class="h1 h2">EE</span><span class="h1 h9">N</span><span class="h9">EGEN</span><br />' +
                    '<span class="h6">S</span><span class="h5">VIJF</span><span class="h4">VIER</span>T<br />' +
                    '<span class="h12">TWAALF</span>V<span class="h">UUR</span><br />');
                    break;
                }
        displayedMinutes = undefined;
        displayTime();
    }

    /**
     * Highlight the classes
     * @param {Array.<string>} classesToHighlight
     * @return {void}
     */
    function highlight(classesToHighlight) {
        var color;
        if (isChildrenTime) {
            color = 'limegreen';
        } else {
            color = 'red';
        }
        $.each(classesToHighlight, function (i, className) {
            $('div.clock .' + className + '').css({ 'color': color, 'font-weight': 900 });
        });
    }

    /**
     * Display the time
     * @param {string} timeString
     * @return {void}
     */
    function updateClock(hours, minutes) {
        var minutesBase = Math.floor(minutes / 5) * 5,
            minutesRest = minutes - minutesBase,
            arrayToHighlight = [],
            normalCss = { 'color': '#7b4125', 'font-weight': 400 };
        isChildrenTime = (hours < 19 && hours >= 7);
        arrayToHighlight[arrayToHighlight.length] = 'es';
        arrayToHighlight[arrayToHighlight.length] = 'ist';

        if ((minutes >= 25 && language === 'de') || (minutes >= 20 && language === 'nl') || (minutesBase > 30 && language === 'en')) {
            hours += 1;
        }
        if (hours >= 12) {
            hours -= 12;
        }
        switch (hours) {
            case 1:
                arrayToHighlight[arrayToHighlight.length] = 'h1';
                break;
            case 2:
                arrayToHighlight[arrayToHighlight.length] = 'h2';
                break;
            case 3:
                arrayToHighlight[arrayToHighlight.length] = 'h3';
                break;
            case 4:
                arrayToHighlight[arrayToHighlight.length] = 'h4';
                break;
            case 5:
                arrayToHighlight[arrayToHighlight.length] = 'h5';
                break;
            case 6:
                arrayToHighlight[arrayToHighlight.length] = 'h6';
                break;
            case 7:
                arrayToHighlight[arrayToHighlight.length] = 'h7';
                break;
            case 8:
                arrayToHighlight[arrayToHighlight.length] = 'h8';
                break;
            case 9:
                arrayToHighlight[arrayToHighlight.length] = 'h9';
                break;
            case 10:
                arrayToHighlight[arrayToHighlight.length] = 'h10';
                break;
            case 11:
                arrayToHighlight[arrayToHighlight.length] = 'h11';
                break;
            default:
                arrayToHighlight[arrayToHighlight.length]= 'h12';
                break;

        }
        if (minutesBase === 0) {
            arrayToHighlight[arrayToHighlight.length] = 'h';
        } else if (language === 'nl') {
            if (minutesBase <= 15 || minutesBase === 35 || minutesBase === 40) {
                arrayToHighlight[arrayToHighlight.length] = 'past';
            } else if (minutesBase >= 45 || minutesBase === 20 || minutesBase === 25) {
                arrayToHighlight[arrayToHighlight.length] = 'to';
            }
            if (minutesBase >= 20 && minutesBase <= 40) {
                arrayToHighlight[arrayToHighlight.length] = 'half';
            }
        } else if (language === 'en') {
            if (minutesBase <= 30) {
                arrayToHighlight[arrayToHighlight.length] = 'past';
            } else {
                arrayToHighlight[arrayToHighlight.length] = 'to';
            }
            if (minutesBase === 30) {
                arrayToHighlight[arrayToHighlight.length] = 'half';
            }
        } else {
            // German:
            if (minutesBase <= 20 || minutesBase === 35) {
                arrayToHighlight[arrayToHighlight.length] = 'past';
            } else if (minutesBase >= 40 || minutesBase === 25) {
                arrayToHighlight[arrayToHighlight.length] = 'to';
            }
            if (minutesBase >= 25 && minutesBase <= 35) {
                arrayToHighlight[arrayToHighlight.length] = 'half';
            }
        }
        switch (minutesBase) {
            case 5:
            case 25:
            case 35:
            case 55:
                arrayToHighlight[arrayToHighlight.length] = 'm5';
                if (language === 'en' && (minutesBase === 25 || minutesBase === 35)) {
                    arrayToHighlight[arrayToHighlight.length] = 'm20';
                }
                break;
            case 10:
            case 50:
                arrayToHighlight[arrayToHighlight.length] = 'm10';
                break;
            case 15:
            case 45:
                arrayToHighlight[arrayToHighlight.length] = 'm15';
                break;
            case 20:
            case 40:
                if (language === 'nl') {
                    arrayToHighlight[arrayToHighlight.length] = 'm10';
                } else {
                    arrayToHighlight[arrayToHighlight.length] = 'm20';
                }
                break;
        }
        if (minutesRest >= 1) {
            arrayToHighlight[arrayToHighlight.length] = '1';
        }
        if (minutesRest >= 2) {
            arrayToHighlight[arrayToHighlight.length] = '2';
        }
        if (minutesRest >= 3) {
            arrayToHighlight[arrayToHighlight.length] = '3';
        }
        if (minutesRest === 4) {
            arrayToHighlight[arrayToHighlight.length] = '4';
        }
        // Reset minute bullets:
        $('div.clock>span').css(normalCss);
        if (minutesRest === 0) {
            $('div.clock>div>span').animate(
                normalCss,
                {
                    'queue': false,
                    'duration': 700,
                    'complete': function () {
                        highlight(arrayToHighlight);
                    }
                }
            );
        } else {
            // Reset clock content:
            $('div.clock>div>span').css(normalCss);
            highlight(arrayToHighlight);
        }
    }

    /**
     * Display the time
     * @return {void}
     */
    function displayTime() {
        var time = new Date(),
            minutes = time.getMinutes(),
            hours;
        document.title = time.toLocaleTimeString();
        if (minutes !== displayedMinutes) {
            // Not always a refresh..
            hours = time.getHours();
            updateClock(hours, minutes);
            displayedMinutes = minutes;
        }
    }

    $("#idTime").on('input', function () {
        var timeString = $('#idTime').val(),
            hours = parseInt(timeString.substring(0, timeString.length - 3), 10);
        clearInterval(timer);
        document.title = 'Manual';
        displayedMinutes = parseInt(timeString.substring(timeString.length - 2), 10);
        updateClock(hours, displayedMinutes);
    });
    
    $("#idCbxLanguage").change(function () {
        changeBoard($(this).val());
    }).change();

    displayTime();
    timer = setInterval(function () {
        displayTime();
    }, 1000);

});
