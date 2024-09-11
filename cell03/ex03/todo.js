function createTodo(value, modal, yesBtn, noBtn, store) {
    const list = document.getElementById('ft_list');
    const newElement = document.createElement('div');

    newElement.innerHTML = value;
        newElement.style.backgroundColor = 'red';
        newElement.onclick = () => {
            
            yesBtn.onclick = function() {
                modal.close();
                deleteElement(newElement, store);
            }

            noBtn.onclick = function() {
                modal.close();
            }

            modal.showModal()
        }

        list.appendChild(newElement);
}

function deleteElement(element, store) {
    const temp = store.filter(val => val != element.innerHTML);

    setCookies(temp);

    element.parentNode.removeChild(element);
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

    const store = getCookies('todo') || [];

    store.forEach(value => {
        createTodo(value, modal, yesBtn, noBtn, store);
    });
    
    btn.onclick = () => {
        const input = document.getElementById('todo-input');
        const value = String(input.value);   
        if (!value.length) {
            alert("Pls enter something before add new TODO");
            return;
        }
        
        store.push(value);
        
        createTodo(value, modal, yesBtn, noBtn, store);

        input.value = "";
        setCookies(store);
    };
})