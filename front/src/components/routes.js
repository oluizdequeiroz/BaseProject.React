import Home from './home';
import Users from './users';
import Refeicoes from './refeicao';
import Receitas from './receita';

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
        icon: 'users',
        name: 'Usuários',
        component: Users
    },
    {
        path: '/refeicao',
        icon: 'cutlery',
        name: 'Refeições',
        component: Refeicoes
    },
    {
        path: '/receita',
        icon: 'list',
        name: 'Receitas',
        component: Receitas
    }
];