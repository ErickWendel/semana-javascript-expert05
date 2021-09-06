# Problemas com Certificado Inválido

Você verá uma mensagem igual à abaixo quando usando estes certificados:

![](./sslproblem.png)

Isso acontece pois o certificado que gerei, foi atrelado ao meu usuário. Mas não se preocupe, você pode clicar em avançado no browser e prosseguir para à aplicação.

## Você pode também gerar sua própria chave se necessário.

- Para gerar sua própria chave você precisa: 
    - Instalar o [MKCert](https://github.com/FiloSottile/mkcert)

    - Colocar seu usuario como usuário válido para certificado, com o comando
     `mkcert -install`
    - Gerar a Key e o Cert:
`mkcert -key-file key.pem -cert-file cert.pem 0.0.0.0 localhost 127.0.0.1 ::1`