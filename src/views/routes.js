import Home from './home';
import Users from './users';

export default [
    {
        exact: true,
        path: '/',
        icon: 'home',
        name: 'Início',
        component: Home
    },
    {
        path: '/users',
        icon: 'person',
        name: 'Usuários',
        component: Users
    }
];