(function() {
    'use strict';

    var site = {
        init: function() {
            var students, graduationMedia, filterInput;

            students = document.querySelector('.students');
            if (students) {
                students.addEventListener('click',
                                          this.onTableClick.bind(this, students));
            }

            graduationMedia = document
                                  .querySelector('.graduation td:nth-child(2)');
            if (graduationMedia) {
                graduationMedia.addEventListener('click',
                                                 this.onMediaClick.bind(this));
            }

            filterInput = document.querySelector('.filter-input');
            if (filterInput) {
                filterInput.addEventListener('keyup',
                                             this.onFilterChange.bind(this));
            }
        },

        onTableClick: function(tableEl, e) {
            var target, activeSort, order;

            if (!tableEl) {
                return;
            }

            target = e.target;

            if (target.nodeName.toLowerCase() !== 'th') {
                return;
            }

            activeSort = tableEl.querySelector('[aria-selected=true]');

            if (activeSort !== null && activeSort !== target) {
                activeSort.setAttribute('aria-selected', false);
                activeSort.setAttribute('aria-sort', 'none');
            }

            order = target.getAttribute('aria-sort');
            order = order === 'ascending' ? -1 : 1;

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
            var target, destination, current;

            target = e.target;
            current = document
                             .querySelector('.graduation [aria-selected=true]');

            if (target.nodeName.toLowerCase() !== 'img') {
                return;
            }

            if (current === target) {
                return;
            }

            destination = document.querySelector('.graduation td:last-child');

            destination.innerHTML = '';
            destination.appendChild(target.cloneNode());

            if (current !== null) {
                current.setAttribute('aria-selected', false);
            }

            target.setAttribute('aria-selected', true);
        },

        onFilterChange: function(e) {
            var value, table, rows, selector;

            value = e.target.value.toLowerCase();
            selector = e.target.getAttribute('data-filter');

            selector = selector === 'cells' ? 'td' : 'tr';

            table = document.querySelector(
                '.' + e.target.getAttribute('aria-controls'));

            rows = [].slice.call(table.querySelectorAll(selector));

            rows.forEach(function(row) {
                if (row.querySelector('th') !== null) {
                    return;
                }

                if (!value) {
                    row.classList.remove('is-hidden');
                    return;
                }

                if (row.textContent.toLowerCase().indexOf(value) < 0) {
                    row.classList.add('is-hidden');
                } else {
                    row.classList.remove('is-hidden');
                }
            });
        }
    };

    site.init();

}());
