# Cats Social Network - Angular

Projeto criado para estudar **nodejs** e aplicar alguns dos conhecimentos iniciais adquiridos no [Curso Completo do Desenvolvedor NodeJS e MongoDB.](https://www.udemy.com/course/curso-completo-do-desenvolvedor-nodejs)
Além de utilizar alguns conhecimentos adquiridos até a etapa atual do curso, este projeto foi também uma oportunidade para utilizar o [Notion](notion.so) pela primeira vez para gerenciar um projeto.

## Funcionalidades Desenvolvidas

* Em cada acesso gerar um feed com posts falsos "criados por gatos"
* Cada post deverá ter a foto e o nome do autor, bem como uma frase aleatória que será o post em si. Lista de APIs abaixo
* Salvar os "gatos autores" no banco para possibilitar novos posts de autores antigos
* Salvar informações vinculando um gato a uma foto de perfil para armazenar os "usuários" da rede social
* Salvar no banco os posts dos "novos gatos autores"
* Criar novos posts com os "usuários antigos" da plataforma

## APIs Utilizadas

* [https://api.thecatapi.com](https://api.thecatapi.com/v1/images/search)
* [https://moraislucas.github.io/MeMotive/phrases.json](https://moraislucas.github.io/MeMotive/phrases.json)
* [https://randomuser.me/](https://randomuser.me/)

## Executando o Projeto

Para o correto funcionamento do projeto, é necessário instalar um banco de dados MySQL e criar as tabelas envolvidas utilizando o script `db.sql` contido no projeto

Em seguida executar os comandos `npm install` para instalar as dependências do projeto e `nodemon app.js` para subir o servidor http.

## Tecnologias

* NodeJS + Express (desenvolvimento do projeto)
* MySQL (banco de dados)
* Axios (requisições Http)
* nodemon (espécie de hot restart)
* consign (carregamento automático de scripts)
