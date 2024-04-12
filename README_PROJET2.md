### PROJET 2 - SHOWTIME - LICENCE 3

* auteur : Barbara JOYEZ

## commandes pour executer le projet

1- Cloner le depot dans votre espace en effectuant :
```
git@github.com:barbarajyz19/TicketMaster.git
```

2- Placez vous dans votre terminal au niveau TicketMaster/client/ et effectuez :
```
npm install
``` 

3- Puis toujours dans TicketMaster/client/ :
```
npm run build 
```

4- Dans un nouveau terminal placez vous maintenant au niveau TicketMaster/server/ et effectuez :
```
mongod --dbpath mongo 
```

5- Dans un nouveau terminal placez vous au niveau TicketMaster/server/ et effectuez :
```
npm install 
```

6- Effectuez cette commande dans TicketMaster/server/ pour importer les spectacles de la base :
```
mongoimport --db allBase --collection show --file ./misc/show.json
```

7- Maintenant lancez le server avec la commande toujours au niveau TicketMaster/server/ :
```
nodemon 
```
ou
```
npm run start
```

8- Pour ouvrir la premiere page sur le navigateur, ouvrez firefox et entrez dans la barre :
```
http://localhost:3000/login.html
```
## informations sur la réalisation du projet 

#### ---- COMPORTEMENTS ---- :

on peut créer : 
* plusieurs utilisateurs
* un seul admin 

coté user : 
* ajouter des tickets pour plusieurs spectacles (1 à la fois par spectacle)

coté admin :
* créer des spectacles
* supprimer des spectacles 


#### ---- CODE ---- :

Tous les comportements attendus fonctionnent normalement.

pour la page login : http://localhost:3000/login.html

pour la page register : http://localhost:3000/register.html

pour la page admin : http://localhost:3000/admin

pour la page user : http://localhost:3000/user

* Information sur les routes :

Pour empêcher d'accéder à admin.html(http://localhost:3000/admin.html) et à user.html(http://localhost:3000/user.html) j'ai donc utilisé la fonction handleError pour rediriger vers la page login.html quand on tente d'accéder à ces pages. 
Par contre, pour empêcher d'accéder via juste admin(http://localhost:3000/admin) ou user(http://localhost:3000/user) j'ai utilisé la vérification avec le middleware authentification directement dans app.js. 


#### ---- Rendu ---- :
Tag Version_final --> version classique sans extension

Tag Version_final_extensions --> version avec extension 

Extensions : 
* permettre la modification de la description d'un spectacle, après sa création (si modification, suppression côté client du spectacle dans ses tickets)
* permettre à l'utilisateur de réserver plus d'un ticket à la fois
