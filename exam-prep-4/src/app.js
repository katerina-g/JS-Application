import { page, render } from './lib.js'
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/data.js';
import { getUserData } from './util.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';
import { searchPage } from './views/search.js';


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', profilePage);
page('/search', searchPage)

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

async function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

export function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.querySelector('#profile').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector("#profile > a:nth-child(1)").textContent = `Welcome ${userData.username}`;
    } else {
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}