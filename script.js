function openCentered(u, w, h) {
    var l = Math.round((screen.width - w) / 2);
    var t = Math.round((screen.height - h) / 2);
    var win = window.open(u, '_blank', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t);
    return !win;
}


function $(id) {
    return document.getElementById(id);
}


document.addEventListener('DOMContentLoaded', function () {

    var today = new Date().toISOString().slice(0, 10);
    var dates = document.querySelectorAll('input[name=sent_date], input[name=visit_date]');

    dates.forEach(function (i) {
        i.value = today;
    });


  if ($('readDom')) {
    $('readDom').onclick = function () {
       
        var surnameEl = document.querySelector('.surname');
        var nameEl = document.querySelector('.name');
        var yearEl = document.querySelector('.year');

    
        if (!surnameEl || !nameEl || !yearEl) {
            $('domOut').textContent = 'Ошибка: проверьте классы (surname, name, year) в HTML';
            return;
        }

       
        $('domOut').textContent =
            'Фамилия: ' + surnameEl.innerText + '\n' +
            'Имя: ' + nameEl.innerText + '\n' +
            'Год рождения: ' + yearEl.innerText;
    };
}

    if ($('toLatin')) {

        var M = {
            'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E', 'Ж': 'ZH', 'З': 'Z',
            'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
            'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'KH', 'Ц': 'TS', 'Ч': 'CH', 'Ш': 'SH',
            'Щ': 'SHCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA'
        };

        function translit(s) {
            var r = '';

            for (var i = 0; i < s.length; i++) {
                if (s[i] in M) {
                    r += M[s[i]];
                } else {
                    r += s[i];
                }
            }

            return r;
        }

        function roman(n) {
            var v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
            var l = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
            var s = '';

            for (var i = 0; i < v.length; i++) {
                while (n >= v[i]) {
                    s += l[i];
                    n -= v[i];
                }
            }

            return s;
        }

        var els = document.querySelectorAll('.cyr, .yr');
        var latin = false;

        els.forEach(function (e) {
            e.dataset.orig = e.textContent;
        });

        $('toLatin').onclick = function () {
            latin = !latin;

            els.forEach(function (e) {
                if (!latin) {
                    e.textContent = e.dataset.orig;
                } else if (e.className === 'yr') {
                    e.textContent = roman(+e.dataset.orig);
                } else {
                    e.textContent = translit(e.dataset.orig);
                }
            });
        };

    }


    if ($('solveBox')) {

        $('solveBox').onclick = function () {
            var box = [+$('boxA').value, +$('boxB').value, +$('boxC').value];
            var door = [+$('doorM').value, +$('doorK').value];
            var all = box.concat(door);

            if (all.some(function (x) { return !(x > 0); })) {
                $('boxOut').textContent = 'Введите положительные размеры';
                return;
            }

            box.sort(function (a, b) { return a - b; });
            door.sort(function (a, b) { return a - b; });

            var ok = box[0] <= door[0] && box[1] <= door[1];

            $('boxOut').textContent =
                'Наименьшая грань коробки: ' + box[0] + ' × ' + box[1] + '\n' +
                'Дверь: ' + door[0] + ' × ' + door[1] + '\n' +
                'Результат: ' + (ok ? 'коробка ПРОЙДЁТ' : 'коробка НЕ пройдёт');
        };

    }

});
