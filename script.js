document.addEventListener('DOMContentLoaded', () => {
    const responseDiv = document.getElementById("response")
    const sendRequestButton = document.getElementById('sendRequest');
    const urlInput = document.getElementById('url');
    const methodInput = document.getElementById('method');
    const bodyInput = document.getElementById('body');
    const headersInput = document.getElementById('headers');
    const responseBody = document.getElementById('responseBody');

    sendRequestButton.addEventListener('click', () => {
        const url = urlInput.value;
        const method = methodInput.value;
        const body = bodyInput.value;
        const headers = headersInput.value.trim() !== '' ? JSON.parse(headersInput.value) : {};

        const isGetMethod = method === 'GET';
        const isDeleteMethod = method === 'DELETE';

        const fetchOptions = {
            method: method,
            headers: new Headers(headers),
        };

        if (!isGetMethod && !isDeleteMethod) {
            fetchOptions.body = JSON.parse(body);
        }

        fetch(url, fetchOptions)
            .then((response) => {
                document.getElementById('statusCode').textContent = response.status;
                return response.json();
            })
            .then((data) => {
                const jsonString = JSON.stringify(data, null, 2);

                function styleJSON(jsonString) {
                    const styledString = jsonString.replace(/"([^"]+)":/g, '<span class="red-text">"$1"</span>:');
                    const styledString2 = styledString.replace(/: ("[^"]+")/g, ': <span class="green-text">$1</span>');
                    const styledString3 = styledString2.replace(/: (true|false)(,|\s*}|$)/g, ': <span class="blue-text">$1</span>');
                    const finalStyledString = styledString3.replace(/: (\d+(\.\d+)?)(,|\s*}|$)/g, ': <span class="red-text">$1</span>$3');
                    return finalStyledString;
                }

                const styledJsonString = styleJSON(jsonString);

                responseDiv.style.display = 'block';

                responseBody.innerHTML = styledJsonString;
            })
            .catch((error) => {
                console.error(error);
                alert('Error: ' + error.message);
            });
    });

});
