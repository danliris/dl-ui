module.exports = [
    {
        route: 'login',
        name: 'login',
        moduleId: './login',
        nav: true,
        title: 'login'
    },
    {
        route: 'changepass',
        name: 'changepass',
        moduleId: './changepass',
        nav: false,
        title: 'ChangePass'
    },
    {
        route: 'samples',
        name: 'samples',
        moduleId: './samples/index',
        nav: false,
        title: 'samples'
    },
    {
        route: 'forbidden',
        name: 'forbidden',
        moduleId: './forbidden',
        nav: false,
        title: 'forbidden'
    }]