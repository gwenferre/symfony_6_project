import '../styles/app.css';

const $ = require('jquery');
global.$ = global.jQuery = $;
require('bootstrap');
$(document).ready(function() {

    // init Ajax
    (function addXhrProgressEvent($) {
        let originalXhr = $.ajaxSettings.xhr;
        $.ajaxSetup({
            progress: $.noop,
            xhr: function() {
                let xhr = originalXhr(), that = this;
                if (xhr) {
                    if (typeof xhr.addEventListener === "function") {
                        xhr.addEventListener("progress", function(event) {
                            that.progress(event);

                            if (that.global) {
                                let eventProgress = $.Event('ajaxProgress', event);
                                eventProgress.type = 'ajaxProgress';
                                $(document).trigger(eventProgress, [xhr]);
                            }
                        },false);
                    }
                }
                return xhr;
            }
        });
    })(jQuery);

    // init tooltips bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

});
