var App = {};
(function () {
    const loading = "Loading.....";
    App = {
        selectors: {
            sendButton: jQuery('#send-request'),
            cancelButton: jQuery('#cancel-request'),
            method: jQuery('#method'),
            requestForm: jQuery('#http-request-form'),
            codeOutput: jQuery('#code-output'),
            headerOutput: jQuery('#header-output'),
            errorContainer: jQuery('#error'),
        },
        ongoingRequest: null,
        init: function () {
            this.bindSendAction();
            this.bindCancelAction();
        },
        bindSendAction: function () {
            this.selectors.requestForm.submit(function (e) {
                e.preventDefault();
                var selectorContext = App.selectors;

                selectorContext.errorContainer.addClass('d-none');

                App.ongoingRequest = $.ajax({
                    url: viewVars.url,
                    method: 'POST',
                    data: selectorContext.requestForm.serialize(),
                    beforeSend: function () {
                        selectorContext.sendButton.attr('disabled', true);
                        selectorContext.headerOutput.text(loading);
                        selectorContext.codeOutput.text(loading);
                    },
                    success: function (result) {
                        selectorContext.codeOutput.text(JSON.stringify(result.response, null, 2));
                        selectorContext.headerOutput.text(JSON.stringify(result.headers, null, 2));
                    },
                    complete: function () {
                        selectorContext.sendButton.attr('disabled', false);
                    },
                    error: function (xhr, exception) {
                        if (xhr.status == 404) {
                            msg = '404 - Requested page not found';
                        } else if (xhr.status == 500) {
                            msg = '500 - Internal Server Error';
                        } else if (exception === 'abort') {
                            msg = 'Request aborted';
                        } else {
                            msg = 'Uncaught Error';
                        }

                        if (xhr.responseText) {
                            msg += '<br/> <strong>Original Response: </strong>' + xhr.responseText;
                        }

                        selectorContext.errorContainer.html(msg).removeClass('d-none');
                        selectorContext.headerOutput.text("");
                        selectorContext.codeOutput.text("");
                        // Hide the error after 10 seconds
                        setTimeout(function () {
                            selectorContext.errorContainer.addClass('d-none');
                        }, 10000);
                    }
                })
            });
        },
        bindCancelAction: function () {
            this.selectors.cancelButton.click(function (e) {
                e.preventDefault();
                var selectorContext = App.selectors;
                selectorContext.headerOutput.text("");
                selectorContext.codeOutput.text("");
                if (App.ongoingRequest && App.ongoingRequest.readyState !== 4) {
                    App.ongoingRequest.abort();
                }

                App.selectors.sendButton.attr('disabled', false);
            });
        },
    };
})();