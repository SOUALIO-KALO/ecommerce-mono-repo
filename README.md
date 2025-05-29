# E-commerce Monorepo

Ce projet est une application e-commerce moderne construite avec une architecture monorepo, combinant un frontend et un backend.

## 🏗 Structure du Projet

```
ecommerce-monorepo/
├── frontend/          # Application frontend
├── backend/           # API et services backend
└── README.md         # Documentation du projet
```

## 🚀 Technologies Utilisées

### Frontend

- React.js
- Redux (pour la gestion d'état)
- Stripe.js (pour l'intégration des paiements)
- Axios (pour les requêtes HTTP)
- Material-UI (pour l'interface utilisateur)

### Backend

- Node.js
- Express.js
- MongoDB
- Stripe API (pour le traitement des paiements)
- JWT (pour l'authentification)
- Mongoose (pour la modélisation des données)

## 📋 Prérequis

- Node.js (version recommandée: >= 14.x)
- npm ou yarn
- MongoDB
- Compte Stripe (pour les paiements)

## 🛠 Installation

1. Cloner le repository

```bash
git clone [URL_DU_REPO]
cd ecommerce-monorepo
```

2. Installer les dépendances du frontend

```bash
cd frontend
npm install
```

3. Installer les dépendances du backend

```bash
cd ../backend
npm install
```

## 🚀 Démarrage

### Frontend

```bash
cd frontend
npm start
```

Le frontend sera accessible sur `http://localhost:3000`

### Backend

```bash
cd backend
npm start
```

L'API sera accessible sur `http://localhost:5000`

## 🌐 Déploiement

### Frontend

- Application déployée sur : [Click me](https://ecommerce-frontend-six-alpha.vercel.app/)

### Backend

- API déployée sur : [Click me](https://ecommerce-backend-1-znfo.onrender.com/api/products)

## 📋 Fonctionnalités

- Authentification des utilisateurs
- Gestion des produits
- Panier d'achat
- Paiement sécurisé avec Stripe
- Gestion des commandes
- Interface d'administration

## 🔧 Configuration

### Variables d'environnement

#### Frontend

Créez un fichier `.env` dans le dossier `frontend` :

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=votre_cle_publique_stripe
```

#### Backend

Créez un fichier `.env` dans le dossier `backend` :

```
PORT=5000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
STRIPE_SECRET_KEY=votre_cle_secrete_stripe
```

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

## 👥 Auteurs

- [Votre nom] - [Votre email]

## 🙏 Remerciements

- Stripe pour leur API de paiement
