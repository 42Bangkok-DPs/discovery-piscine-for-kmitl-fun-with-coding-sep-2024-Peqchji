function createTodo(value, modal, yesBtn, noBtn) {
    const list = document.getElementById('ft_list');
    const newElement = document.createElement('div');

    newElement.innerHTML = value;
        newElement.style.backgroundColor = 'red';
        newElement.onclick = () => {
            
            yesBtn.onclick = function() {
                modal.close();
                deleteElement(newElement);
            }

            noBtn.onclick = function() {
                modal.close();
            }

            modal.showModal()
        }

        list.appendChild(newElement);
}

function deleteElement(element) {
    element.parentNode.removeChild(element);
}

function getCookies(key) {
    return JSON.parse(document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')?.pop())

}


window.addEventListener('load', () => {
    const btn = document.getElementById('add-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const modal = document.getElementById('myModal');

    const store = getCookies('todo') || [];

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
        document.cookie = `todo=${JSON.stringify(store)}; path=/;`
    };
})