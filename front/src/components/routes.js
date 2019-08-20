import Home from './home';
import Users from './users';
import Produtos from './produtos';
import Clientes from './clientes';
import Fornecedores from './fornecedores';
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
        path: '/clientes',
        icon: 'users',
        name: 'Clientes',
        component: Clientes
    },
    {
        path: '/produtos',
        icon: 'users',
        name: 'Produtos',
        component: Produtos
    },
    {
        path: '/fornecedores',
        icon: 'users',
        name: 'Fornecedores',
        component: Fornecedores
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