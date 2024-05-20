
# Portal de noticias

Uma aplicação desenvolvida com o intuito academico, consiste em um portal de noticias.



## Stack utilizada

**Front-end:** Handlebars, Javascript, CSS

**Back-end:** NodeJS, Express, MongoDB


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DB_USER`

`DB_PASS`

`SECRET`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/AkiraM0ri/portal-noticias
```

Entre no diretório do projeto

```bash
  cd portal-noticias
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Documentação da API

#### Home

```http
  GET /
```

Rendeniza a página home.

#### Cadastro de um usuario novo

```http
  POST /auth/register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuario |
| `email` | `string` | **Obrigatório**. Email do usuario |
| `password` | `string` | **Obrigatório**. Senha do usuario |
| `confirmpass` | `string` | **Obrigatório**. Confirmação da senha |

Retorna uma mensagem de sucesso.

#### Login de um usuario

```http
  POST /auth/login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email` | `string` | **Obrigatório**. Email do usuario |
| `password` | `string` | **Obrigatório**. Senha do usuario |

Realiza o login e retorna o token e uma mensagem de sucesso.

#### Verifica os dados de um usuario pelo ID

```http
  GET /user/:id
```

Retorna os dados daquele usuario caso exista.




## Proximas atualizações

- Adicionar uma forma de usar a aplicação via API ou rendenizando a pagina

- Adicionar tela de cadastro de usuario e design

- Feed e cadastro de noticias  


## Autores

- [@AkiraM0ri](https://www.github.com/AkiraM0ri)

