# instalação no mac
# https://github.com/FiloSottile/mkcert
# brew install mkcert nss
# mkcert -install


mkcert -key-file key.pem -cert-file cert.pem 0.0.0.0 localhost 127.0.0.1 ::1
 
 