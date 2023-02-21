# Symfony 6 project with Docker (NGINX, PHP8.1, PostGreSQL)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Pré-requis:
- Avoir installé Docker
- Avoir installé Docker-compose
- Avoir installé git
- Avoir installé NPM

## Visualisation du projet

### Dossier "scripts"
Ce dossier regroupe les fichiers de configuration docker (nginx, postgres, php et Dockerfile php) et les scripts permettant de manipuler les containers (ex: bash.sh permet d'entrer dans le container php).

### .env
Il s'agit du fichier de configuration des variables d'environnement du projet et des paramètres importants tels que les clefs d'api ou les mots de passe. Il ne doit pas être présent sur le repository pour des raisons de sécurité. Un fichier .env.sample vide est disponible dans le dossier scripts pour configurer le projet.

Ce fichier détermine aussi si l'on est en environnement de développement ou de production.

### docker-compose-yml
Ce fichier permet de configurer les containers docker. Ils sont au nombre de 3:
- un container PHP (8.1)
- un container NGINX (serveur web)
- un container POSTGRESQL (Base de données)

Le container NGINX a besoin de plusieurs choses:
- un fichier de configuration "default.conf" qui se trouve dans le dossier "scripts/docker/dev/nginx" et qui sera copié dans le container
- les ports sur lesquels le container dialoguera avec l'host
- les dépendances (ici les containers php et postgresql)

Le container Postgresql a besoin de plusieurs choses:
- plusieurs variables d'environnement qui détermineront le nom, l'utilisateur et le mot de passe de la base de données
- les ports sur lesquels le container dialoguera avec l'host
- un dossier de communication entre l'host et le container: un volume
- un dossier "dump" dans lequel seront copié les dumps de la base de données (copies)

Le container PHP est le plus complexe a mettre en place car il a besoin d'un fichier de configuration additionnel: Dokerfile (qui se trouve dans "scripts/docker/dev/php"):
- Le dockerfile dit à docker d'installer la version 8.1 de php avec certaines extensions, et d'installer l'outil de gestion de packages Composer. En environnement de développement, on lui demande aussi d'installer Xdebug qui permet de débugger)
- On lui passe notamment le php.ini et le xdebug.ini en environnement de développement

Pour changer la version de PHP, il faut modifier le Dockerfile.

### composer.json
Ce fichier définit les librairies bask-end du projet. Il est utilisé pour l'outil de gestion de packages Composer qui doit être lancé dans le container PHP. C'est lui notamment qui installe et gère Symfony.

Pour changer la version de Symfony, il faut modifier le composer.json.

### package.json
Ce fichier définit les librairies front-end du projet comme Jquery, bootstrap, etc. Il est utilisé par l'outil de gestion de packages NPM (ou Yarn selon les projets).
Il doit être lancé depuis l'host, à la racine du projet (et non dans un container).

## Installation
!! Toutes les manipulations se font en ligne de commandes. !!

Clôner le repository GitHub :
```sh
git clone
```

Se positionner à la racine du projet.
```sh
cd symfony_project_base
```

Copier le fichier de variables d'environnement :
```sh
cp scripts/.env.sample .env
```

Créer le dossier var/cache/dev et lui donner les droits utilisateurs correspondants :
```sh
mkdir var/cache/dev && chown [user]:[user] var/cache/dev
```

Créer le dossier var/log et lui donner les droits utilisateurs correspondants :
```sh
mkdir var/log && chown [user]:[user] var/log
```

Se connecter en root et créer le volume (dossier) qui fera le pont entre le container de la base de données et l'host :
```sh
sudo -s
cd /mnt && mkdir symfony && cd symfony && mkdir db
```

Lancer le build des containers docker (cela peut prendre une dizaine de minutes) :
```sh
docker-compose build
```

Démarrer les containers :
```sh
docker-compose up -d
```

Aller dans le container PHP avec le script bash.sh :
```sh
./scripts/bash.sh
```

ou lancer la commande suivante pour se connecter au container :
```sh
docker exec -it symfony_${container} /bin/bash -c "export TERM=xterm-256color; exec bash;"
```

Installer les librairies Symfony avec Composer :
```sh
composer install
```

Sortir du container docker avec Ctrl+D.

Lancer NPM pour installer les librairies front-end :
```sh
npm install
```

Lancer la commande npm qui permet de compiler les assets js, css, etc. vers le dossier public :
```sh
npm run build
```

Pour lancer la compilation en temps réel :
```sh
npm run watch
```

Pour lancer la compilation en environnement de production :
```sh
npm run build
```

Si tout s'est déroulé correctement, vous pouvez vous rendre sur "localhost" et voir un joli "Hello World!".