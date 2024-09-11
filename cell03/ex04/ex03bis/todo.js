function createTodo(value, modals, yesBtn, noBtn, store) {
    const list = $('#ft_list');
    const newElement = $('<div></div>')
    const modal = modals[0];
    
    newElement.text(value)
    newElement.css('backgroundColor', 'red');

    newElement.on('click', () => {
        
        yesBtn.on('click', () => {
            const temp = store.filter(val => val != element.innerHTML);
            
            modal.close();
            newElement.remove();

            setCookies(temp);
        });

        noBtn.on('click', () => {
            modal.close();
        });

        modal.showModal();
    });

    list.append(newElement);
}

function getCookies(key) {
    const cookies = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');

    return cookies ? JSON.parse(cookies.pop()) : [];
}


$(document).ready(() => {
    const btn = $('#add-btn');
    const yesBtn = $('#yes-btn');
    const noBtn = $('#no-btn');
    const modal = $('#myModal');

    const store = getCookies('todo') || [];

    store.forEach(value => {
        createTodo(value, modal, yesBtn, noBtn, store);
    });
    
    btn.on('click', () => {
        const input = $('#todo-input');
        const value = String(input.val());   

        if (!value.length) {
            alert("Pls enter something before add new TODO");
            return;
        }
        
        store.push(value);
        
        createTodo(value, modal, yesBtn, noBtn, store);

        input.val('');

        document.cookie = `todo=${JSON.stringify(store)}; path=/;`
    });
});