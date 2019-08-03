export const treatUserName = (response) => {
    const username = response.retorno && response.retorno.usunome;
    sessionStorage.setItem('username', username);
    return username;
}