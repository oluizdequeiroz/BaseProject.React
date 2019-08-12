import Home from './home';
import Users from './users';
import Refeicoes from './refeicao';
import Receitas from './receita';
import MapaProducao from './mapaProducao';

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
        path: '/refeicoes',
        icon: 'cutlery',
        name: 'Refeições',
        component: Refeicoes
    },
    {
        path: '/receita',
        icon: 'list',
        name: 'Receitas',
        component: Receitas
    },
    {
        path: '/mapaProducao',
        icon: 'map',
        name: 'Mapa',
        component: MapaProducao
    }
];