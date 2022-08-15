##### X-API-KEY

Minha X-API-KEY serve para IDENTIFICAR o CLIENT.

Ou seja, ela não serve para autorização e sim autenticação.

É como se fosse um TOKEN que identifico o cliente.

Ex.: Imagine que você tem uma API de pagamentos como o PAGAR.ME.
E você tem vários CLIENTES que usam essa API. Imagina esse cliente ter que ficar se autenticando toda hora na sua API. Então para facilitar e agilizar o CLIENTE passa um API-KEY.

##### LAMBDA AUTHORIZER

Já nossa lambda authorizer serve para pegar um TOKEN passado pelo CLIENT que serve para verificar a autorização daquele cliente.

Ex.: Imagine que dentro do sistema do seu CLIENTE tem vários usuários. E esses usuários tem diferentes níveis de acesso. Por isso após efetuar o login, deve ser passado em todas as requisições o TOKEN JWT (exemplo) para que a API possa validar a autorização do usuário do CLIENTE que está utilizando a plataforma.

##### APIs HTTP vs APIs REST

```
APIs REST e APIs HTTP são produtos da API RESTful. As APIs REST são compatíveis com mais recursos do que as APIs HTTP, enquanto as APIs HTTP são projetadas com recursos mínimos para que possam ser oferecidas por um preço mais baixo. Escolha APIs REST se precisar de recursos como chaves de API, limitação por cliente, validação de solicitações, integração AWS WAF ou endpoints de API privados. Escolha APIs HTTP se você não precisar dos recursos incluídos nas APIs REST.
```

##### LINKS

```
https://thiagolima.blog.br/parte-3-seguran%C3%A7a-em-apis-restful-a780bd9f186a

https://betterprogramming.pub/how-to-use-custom-authorizer-in-aws-api-gateway-with-serverless-4ddf42f32390

MUITO IMPORTANTE 👇🏽

https://docs.aws.amazon.com/pt_br/apigateway/latest/developerguide/http-api-vs-rest.html
```
