var store = getCookies('todo') || [];

function createTodo(value, modal, yesBtn, noBtn) {
    const list = document.getElementById('ft_list');
    const newElement = document.createElement('div');

    newElement.innerHTML = value;
        newElement.style.backgroundColor = 'red';
        newElement.onclick = () => {
            
            yesBtn.onclick = function() {
                modal.close();
                deleteElement(list, newElement);
            }

            noBtn.onclick = function() {
                modal.close();
            }

            modal.showModal()
        }

        list.appendChild(newElement);
}

function deleteElement(list, element) {
    store = [];
    element.parentNode.removeChild(element);

    const child = list.children;
    for (let idx = 0; idx < child.length; idx++) {
        store.push(child[idx].innerHTML)
    }

    setCookies(store);

}

function getCookies(key) {
    const cookies = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');

    return cookies ? JSON.parse(cookies.pop()) : [];
}

function setCookies(store) {
    document.cookie = `todo=${JSON.stringify(store)}; path=/;`
}


window.addEventListener('load', () => {
    const btn = document.getElementById('add-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const modal = document.getElementById('myModal');

    store.forEach(value => {
        createTodo(value, modal, yesBtn, noBtn);
    });
    
    btn.onclick = () => {
        const input = document.getElementById('todo-input');
        const value = String(input.value);   
        if (!value.length) {
            alert("Pls enter something before add new TODO");
            return;
        }
        
        store.push(value);
        
        createTodo(value, modal, yesBtn, noBtn);

        input.value = "";
        setCookies(store);
    };
})