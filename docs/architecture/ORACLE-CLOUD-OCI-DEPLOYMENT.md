# Guia de Deploy e Infraestrutura na Oracle Cloud Infrastructure (OCI)

Este guia documenta o provisionamento e o deploy contínuo do backend Java 21 / Spring Boot 3 e banco PostgreSQL do VanBora utilizando a camada gratuita Always Free da **Oracle Cloud Infrastructure (OCI)**.

---

## 1. Arquitetura na Nuvem (Always Free Tier)

A Oracle Cloud oferece instâncias compute ARM (Ampere A1) com até 4 OCPUs e 24 GB de RAM gratuitamente.

```
                    ┌────────────────────────────┐
                    │      Internet / Usuários   │
                    └─────────────┬──────────────┘
                                  │ HTTPS (443)
                                  ▼
                    ┌────────────────────────────┐
                    │  Vercel (Frontend React)   │
                    │   vanbora-lac.vercel.app   │
                    └─────────────┬──────────────┘
                                  │ REST API / CORS
                                  ▼
             ┌──────────────────────────────────────────┐
             │         Oracle Cloud (OCI - SP)          │
             │  ┌────────────────────────────────────┐  │
             │  │ Nginx (Reverse Proxy & SSL Let's)  │  │
             │  └─────────────────┬──────────────────┘  │
             │                    │ 8080                │
             │  ┌─────────────────▼──────────────────┐  │
             │  │ VanBora Spring Boot 3 (Java 21)    │  │
             │  │ (systemd service ou Docker)        │  │
             │  └─────────────────┬──────────────────┘  │
             │                    │ 5432                │
             │  ┌─────────────────▼──────────────────┐  │
             │  │ PostgreSQL 16 Database             │  │
             │  │ (Docker com volume persistente)    │  │
             │  └────────────────────────────────────┘  │
             └──────────────────────────────────────────┘
```

---

## 2. Passo a Passo de Configuração na OCI

### 2.1 Criar a Instância Compute
1. No console OCI: **Compute** > **Instances** > **Create Instance**.
2. **Image:** Canonical Ubuntu 22.04 LTS ou Oracle Linux 9.
3. **Shape:** `VM.Standard.A1.Flex` (2 OCPUs, 12 GB RAM) ou `VM.Standard.E2.1.Micro` (1 OCPU, 1 GB RAM).
4. **Networking:** Criar em uma VCN pública com IP público reservado.
5. **SSH Keys:** Baixar a chave privada `.key` para acesso SSH.

### 2.2 Configurar Security List (Firewall da VCN)
Na Security List da Subnet pública, adicione Ingress Rules:
- **Porta 22 (SSH):** Apenas seu IP ou 0.0.0.0/0 com chave protegida.
- **Porta 80 (HTTP):** 0.0.0.0/0 (Let's Encrypt renewal).
- **Porta 443 (HTTPS):** 0.0.0.0/0 (Tráfego seguro da API).
- *Obs:* A porta 5432 do PostgreSQL **NUNCA** deve ser aberta para a internet pública; deve ser acessível apenas localmente (`localhost`).

### 2.3 Instalação dos Pacotes na VM (Ubuntu)
Conecte via SSH:
```bash
ssh -i sua_chave.key ubuntu@<IP_PUBLICO_OCI>

# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar Java 21 LTS e Docker
sudo apt install -y openjdk-21-jdk git docker.io docker-compose-v2 nginx certbot python3-certbot-nginx
sudo usermod -aG docker ubuntu
```

### 2.4 Subir o PostgreSQL na VM
Crie um arquivo `docker-compose.yml` na VM:
```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: vanbora-db
    restart: always
    environment:
      POSTGRES_DB: vanbora_db
      POSTGRES_USER: vanbora_admin
      POSTGRES_PASSWORD: SuaSenhaSuperSeguraAqui123!
    ports:
      - "127.0.0.1:5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```
Suba o banco:
```bash
docker compose up -d
```

### 2.5 Configuração do Serviço Systemd para a API Spring Boot
Compile o arquivo `.jar` localmente ou na VM:
```bash
cd backend
./mvnw clean package -DskipTests
```
Crie a unidade systemd `/etc/systemd/system/vanbora-api.service`:
```ini
[Unit]
Description=VanBora Spring Boot Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/vanbora/backend
ExecStart=/usr/bin/java -Xms256m -Xmx768m -jar target/vanbora-backend-0.0.1-SNAPSHOT.jar
Environment="SPRING_PROFILES_ACTIVE=prod"
Environment="DB_URL=jdbc:postgresql://localhost:5432/vanbora_db"
Environment="DB_USERNAME=vanbora_admin"
Environment="DB_PASSWORD=SuaSenhaSuperSeguraAqui123!"
Environment="JWT_SECRET=ChaveSuperSecretaDePeloMenos256BitsParaProducaoVanBora2026!"
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```
Habilite e inicie:
```bash
sudo systemctl daemon-reload
sudo systemctl enable vanbora-api
sudo systemctl start vanbora-api
sudo systemctl status vanbora-api
```

### 2.6 Configurar Nginx Reverse Proxy com SSL
Configure `/etc/nginx/sites-available/api.vanbora.com.br`:
```nginx
server {
    server_name api.vanbora.com.br;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Ative o certificado SSL gratuito Let's Encrypt:
```bash
sudo ln -s /etc/nginx/sites-available/api.vanbora.com.br /etc/nginx/sites-enabled/
sudo certbot --nginx -d api.vanbora.com.br
```

---

## 3. Integração Contínua com GitHub Actions

O arquivo `.github/workflows/backend-ci.yml` já pode ser utilizado para compilar, rodar testes automatizados e gerar o artefato executável a cada push na branch `main`.
