# Claim Check Pattern
O Claim Check é um pattern que envolve o contexto de sistema de mensageria. Basicamente, esse pattern tem como objetivo evitar a utilização do sistema de mensageria para realizar a transferência de mensagens que contém um grande conteúdo, mas sem perder o processamento assíncrono.

Esse pattern consiste no seguinte fluxo de implementação:
> 1. Primeiro, a aplicação responsável por enviar a mensagem para o serviço de mensageria armazena o conteúdo principal em um local externo (um banco de dados por exemplo), definindo uma chave de acesso para este conteúdo armazenado. Feito isso, a aplicação envia a mensagem contendo a chave de acesso.
> 2. Posteriomente, a aplicação responsável por receber a mensagem recebe a mesma, pega a chave de acesso e solicita o conteúdo referente a essa chave. Com o conteúdo retornado e disponível, o processamento pode seguir o fluxo normalmente.
> 3. Para finalizar, o conteúdo referente a chave informada é excluído do armazenamento externo.

![image](https://github.com/martineli17/pattern-claim-check/assets/50757499/bafa89b5-7b7a-46fb-a57e-9ce95b86cfdc)
<small>Fonte: https://learn.microsoft.com/en-us/azure/architecture/patterns/claim-check</small>

## Necessidade deste pattern
- Velocidade de processamento: caso o fluxo de processamento tenha a necessidade de enviar um conteúdo muito extenso para outras aplicações, se o envio deste conteúdo ocorrer pelo próprio sistema de mensageria, o mesmo pode perder poder de processamento e ficar mais lento.
- Economia de gastos: cada serviço de mensageria tem o seu determinado limite de tamanho por mensagem e, além disso, alguns serviços define esse limite por tipo de plano contratado. Então este pattern pode auxiliar a fim de evitar a contração de um plano de maior custo.

## Exemplo de implementação
Para exemplificar a implementação deste pattern, foi criado neste repositório 3 aplicações, sendo elas:
- Manager: essa aplicação será responsável por gerenciar o conteúdo a ser salvo e que é referente as mensagens
- SendingApp: essa aplicação será responsável por enviar as mensagens e, caso necessário, solicitar o armazenamento do conteúdo na aplicação gerenciadora.
- ReceivingApp: essa aplicação será responsável por receber as mensagens e, caso necessário, solicitar a busca do conteúdo na aplicação gerenciadora.

### [Manager](https://github.com/martineli17/pattern-claim-check/tree/master/manager)
Nesta aplicação utilizado um banco de dados para o armazenamento do conteúdo das mensagens e criada a tabela `message_content`. Para este exemplo, foi utilizado o banco de dados Postgres.

[Arquivos referentes a camada de dados](https://github.com/martineli17/pattern-claim-check/tree/master/manager/src/infra/data)

Além disso, foi utilizado o protocolo `gRPC` (visando maior desempenho na comunição entre os serviços) para que as demais aplicações possam realizar as operações de salvar, buscar e marcar como utilizado o conteúdo da mensagem.

[Arquivos referentes a camada de apresentação](https://github.com/martineli17/pattern-claim-check/tree/master/manager/src/apresentation/grpc)

Variávies de ambiente
```
DATABASE_HOST="localhost"
DATABASE_PORT="5432"
DATABASE_USERNAME="test"
DATABASE_PASSWORD="test"
DATABASE_NAME="test"
```

### [SendingApp](https://github.com/martineli17/pattern-claim-check/tree/master/sending-app)
Nesta aplicação, existe um endpoint de demonstração que receberá um payload qualquer e, através da quantidade de bytes deste payload, será definido se o conteúdo da mensagem irá ser salvo no armazenamento externo gerenciado pelo Manager. Caso não seja necessário, o conteúdo da mensagem é enviado diretamente por mensageria.

A aplicação utiliza o serviço de mensageria SQS da AWS.

[Arquivos referentes a camada de apresentação](https://github.com/martineli17/pattern-claim-check/tree/master/sending-app/src/apresentation/controllers)

Caso seja necessário enviar o conteúdo para o `Manager`, essa comunicação é feita, como mencionado anteriormente, via `gRPC`.

[Arquivos referentes a camada de comunicação](https://github.com/martineli17/pattern-claim-check/tree/master/sending-app/src/infra/integrations/message-content)

Variávies de ambiente
```
AWS_ENDPOINT=""
AWS_QUEUE_ENDPOINT=""
```

### [ReceivingApp](https://github.com/martineli17/pattern-claim-check/tree/master/receiving-app)
Nesta aplicação, existe um subscriber responsável por receber os dados da fila na qual a aplicação `SendingApp` envia a mensagem. No processamento desse subscriber, é verificado se contém alguma chave de acesso para o conteúdo e, caso tenha, é solicitado para o `Manager` o retorno deste conteúdo que foi armazenado.

Após o processamento ser finalizado, é informado para o `Manager` que tal conteúdo já foi utilizado, assim o mesmo é removido do banco de dados.

A aplicação utiliza o serviço de mensageria SQS da AWS. 

[Arquivos referentes a camada de apresentação](https://github.com/martineli17/pattern-claim-check/tree/master/receiving-app/src/apresentation/broker-subscribers)

Caso seja necessário solicitar o conteúdo para o `Manager`, essa comunicação é feita, como mencionado anteriormente, via `gRPC`.

[Arquivos referentes a camada de comunicação](https://github.com/martineli17/pattern-claim-check/tree/master/receiving-app/src/infra/integrations/message-content)

Variávies de ambiente
```
AWS_ENDPOINT=""
AWS_QUEUE_ENDPOINT=""
```
