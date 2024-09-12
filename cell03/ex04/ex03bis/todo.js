var store = getCookies('todo') || [];

function createTodo(value, modals, yesBtn, noBtn) {
    const list = $('#ft_list');
    const newElement = $('<div></div>')
    const modal = modals[0];
    
    newElement.text(value)
    newElement.css('backgroundColor', 'red');

    newElement.on('click', () => {
        
        yesBtn.on('click', () => {
            deleteElement(list, newElement);
            modal.close();
        });

        noBtn.on('click', () => {
            modal.close();
        });

        modal.showModal();
    });

    list.append(newElement);
}

function deleteElement(list, element) {
    store = [];
    element.remove();
    
    const child = list.children();
    for (let idx = 0; idx < child.length; idx++) {
        store.push(child[idx].innerHTML)
    }

    setCookies('todo', store);

}

function getCookies(key) {
    const cookies = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');

    return cookies ? JSON.parse(decodeURI(cookies.pop())) : [];
}

function setCookies(key, val) {
    const encoded = encodeURI(JSON.stringify(val))
    document.cookie = `${key}=${encoded}; path=/;`
}


$(document).ready(() => {
    const btn = $('#add-btn');
    const yesBtn = $('#yes-btn');
    const noBtn = $('#no-btn');
    const modal = $('#myModal');

    store.forEach(value => {
        createTodo(value, modal, yesBtn, noBtn);
    });
    
    btn.on('click', () => {
        const input = $('#todo-input');
        const value = String(input.val());   

        if (!value.length) {
            alert("Pls enter something before add new TODO");
            return;
        }
        
        store.push(value);
        
        createTodo(value, modal, yesBtn, noBtn);

        input.val('');

        setCookies('todo', store);
    });
});