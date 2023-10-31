// Tu códgigo aquí
const image = document.querySelector('img');
const jokeDIV = document.querySelector('#display-joke');
const button = document.querySelector('#get-joke');


async function getRandomJoke(category) {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
    if (!response.ok) {
        throw new Error("Error fetching joke");
    }
    const data = await response.json();
    return data;
}

async function getCategories() {
    const response = await fetch('https://api.chucknorris.io/jokes/categories');
    if (!response.ok) {
        throw new Error("Error fetching categories");
    }
    const data = await response.json();
    return data;
}

window.addEventListener('load', async () => {
    const categories = await getCategories();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        document.querySelector('#joke-category').appendChild(option);
    })
})

const jokeCategory = document.querySelector('#joke-category');
jokeCategory.addEventListener('change', () => {
    const category = jokeCategory.value;
    button.addEventListener('click', async () => {
        try {
            const joke = await getRandomJoke(category);
            jokeDIV.textContent = joke.value;

        } catch (error) {
            jokeDIV.textContent = 'Ups, vaya! Ha habido un error!';
            console.error('Error:', error);
        }
    })
})


