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
        icon: 'users',
        name: 'Refeições',
        component: Refeicoes
    },
    {
        path: '/receita',
        icon: 'users',
        name: 'Receitas',
        component: Receitas
    }
];