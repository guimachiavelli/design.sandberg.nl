(function() {
    'use strict';

    var site = {
        init: function() {
            var students = document.querySelector('.students');
            students.addEventListener('click',
                                      this.onTableClick.bind(this, students));

            var graduationMedia = document.querySelector('.graduation td:nth-child(2)');
            graduationMedia.addEventListener('click', this.onMediaClick.bind(this));
        },

        onTableClick: function(tableEl, e) {
            var target;

            if (!tableEl) {
                return;
            }

            target = e.target;

            if (target.nodeName.toLowerCase() !== 'th') {
                return;
            }

            var activeSort = tableEl.querySelector('[aria-selected=true]');
            if (activeSort !== null && activeSort !== target) {
                activeSort.setAttribute('aria-selected', false);
                activeSort.setAttribute('aria-sort', 'none');
            }

            var order = target.getAttribute('aria-sort');
            if (order === 'ascending') {
                order = -1;
            } else {
                order = 1;
            }

            this.tableSort(tableEl,
                           target.getAttribute('data-key'),
                           order);

            target.setAttribute('aria-selected', true);
            target.setAttribute('aria-sort',
                               order > 0 ? 'ascending' : 'descending');
        },

        tableSort: function(el, key, direction) {
            var rows, sorted, header;

            rows = [].slice.call(el.querySelectorAll('tr'));
            header = rows.shift();

            sorted = rows.sort(function(a, b) {
                var termA, termB;
                termA = a.getAttribute('data-' + key);
                termB = b.getAttribute('data-' + key);
                return termA.localeCompare(termB) * direction;
            });

            el.innerHTML = '';
            el.appendChild(header);

            for (var i = 0, len = sorted.length; i < len; i += 1) {
                el.appendChild(sorted[i]);
            }
        },

        onMediaClick: function(e) {
            var target, destination;

            target = e.target;

            if (target.nodeName.toLowerCase() !== 'img' ) {
                return;
            }

            destination = document.querySelector('.graduation td:last-child');

            console.log(destination);

        }
    };

    site.init();

}());
