# 🚀 Guide de Déploiement Enginex sur Netlify

## 📋 PARTIE 1: DÉPLOIEMENT SUR NETLIFY (GRATUIT)

### Étape 1: Créer un compte GitHub (si vous n'en avez pas)

1. Allez sur https://github.com
2. Cliquez sur **"Sign up"**
3. Créez votre compte gratuitement

### Étape 2: Créer un dépôt GitHub pour votre projet

1. Sur GitHub, cliquez sur le **"+"** en haut à droite
2. Sélectionnez **"New repository"**
3. Nom du dépôt: `enginex`
4. Visibilité: **Public** (c'est gratuit)
5. Cliquez **"Create repository"**

### Étape 3: Uploader votre code sur GitHub

**Option A: Via l'interface web (plus simple)**

1. Sur la page de votre nouveau dépôt, cliquez sur **"uploading an existing file"**
2. Glissez-déposez TOUS les fichiers de votre projet:
   - `src/` (dossier complet)
   - `public/` (si existe)
   - `supabase/` (dossier complet)
   - `package.json`
   - `package-lock.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `tsconfig.app.json`
   - `tsconfig.node.json`
   - `index.html`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `netlify.toml` ⭐ (IMPORTANT - nouveau fichier créé)
   - `.gitignore`
   - `README.md`

3. **NE PAS uploader:**
   - ❌ `node_modules/`
   - ❌ `dist/`
   - ❌ `.env` (on le configurera directement sur Netlify)

4. Cliquez **"Commit changes"**

**Option B: Via Git (pour utilisateurs avancés)**

```bash
# Dans le terminal, dans votre dossier projet
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/enginex.git
git push -u origin main
```

### Étape 4: Créer un compte Netlify

1. Allez sur https://www.netlify.com
2. Cliquez **"Sign up"**
3. Choisissez **"Sign up with GitHub"**
4. Autorisez Netlify à accéder à GitHub

### Étape 5: Déployer sur Netlify

1. Dans Netlify, cliquez **"Add new site"** → **"Import an existing project"**
2. Choisissez **"Deploy with GitHub"**
3. Autorisez l'accès si demandé
4. Sélectionnez le dépôt **"enginex"**

5. **Configuration du build:**
   - Build command: `npm run build` (déjà rempli)
   - Publish directory: `dist` (déjà rempli)
   - ✅ Netlify détecte automatiquement le fichier `netlify.toml`

6. **Variables d'environnement** - Cliquez sur **"Add environment variables"**:

   Ajoutez ces 2 variables:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://txfhmlovwheuivlwlmdt.supabase.co`

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4ZmhtbG92d2hldWl2bHdsbWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTQxODksImV4cCI6MjA3NTE5MDE4OX0.cthOlhuUIpWOSywxVkKyzfFe2f54Cm1pBsJjNytGzQo`

7. Cliquez **"Deploy enginex"**

### Étape 6: Attendre le déploiement

- Le déploiement prend 2-5 minutes
- Vous verrez les logs en temps réel
- Une fois terminé, vous verrez: ✅ **"Site is live"**

### Étape 7: Tester votre site

Netlify vous donnera une URL temporaire comme:
```
https://enginex-abc123.netlify.app
```

Testez toutes les fonctionnalités:
- ✅ Page d'accueil
- ✅ Annonces
- ✅ Abonnements
- ✅ Connexion/Inscription
- ✅ Publication d'annonces

---

## 🌐 PARTIE 2: CONFIGURER VOTRE DOMAINE enginex.ma

### Option A: Via Netlify DNS (RECOMMANDÉ - Plus simple)

#### 1. Dans Netlify

1. Allez dans **Site settings** → **Domain management**
2. Cliquez **"Add custom domain"**
3. Entrez: `enginex.ma`
4. Cliquez **"Verify"** puis **"Add domain"**
5. Netlify affichera les **nameservers** (serveurs DNS):
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   (Les vôtres seront peut-être différents)

#### 2. Chez Hostinger (ou votre hébergeur)

1. Connectez-vous à votre panneau Hostinger
2. Allez dans **Domains** → Sélectionnez `enginex.ma`
3. Cherchez **"Nameservers"** ou **"DNS"**
4. Changez de **"Hostinger nameservers"** vers **"Custom nameservers"**
5. Entrez les 4 nameservers de Netlify (de l'étape précédente)
6. **Sauvegardez**

#### 3. Retour sur Netlify

1. Attendez 5-10 minutes (propagation DNS)
2. Netlify vérifiera automatiquement le domaine
3. Une fois vérifié, cliquez **"Enable HTTPS"** (SSL gratuit)
4. Attendez 1-2 minutes pour l'activation du certificat SSL

✅ **Votre site sera accessible sur https://enginex.ma dans 10-30 minutes!**

---

### Option B: Via enregistrements DNS (Plus technique)

Si vous ne voulez pas changer les nameservers:

#### 1. Dans Netlify
- Notez l'adresse IP ou le nom de domaine Netlify fourni

#### 2. Chez Hostinger

1. Allez dans **DNS/Zone Editor** pour `enginex.ma`
2. **Supprimez** tous les enregistrements A et CNAME existants pour `@` et `www`
3. **Ajoutez ces enregistrements:**

   **Pour le domaine principal:**
   - Type: `A`
   - Name: `@`
   - Value: `75.2.60.5` (IP de Netlify - vérifiez dans Netlify)
   - TTL: `3600`

   **Pour le www:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `votre-site.netlify.app` (votre URL Netlify)
   - TTL: `3600`

4. **Sauvegardez**

#### 3. Attendre la propagation
- 10-30 minutes pour la propagation DNS
- Vérifiez sur https://dnschecker.org

---

## ✅ VÉRIFICATION FINALE

Après 30 minutes, testez:

1. **HTTP:** `http://enginex.ma` → devrait rediriger vers HTTPS
2. **HTTPS:** `https://enginex.ma` → votre site s'affiche
3. **WWW:** `https://www.enginex.ma` → redirection vers la version sans www
4. **Fonctionnalités:**
   - Inscription/Connexion
   - Publication d'annonces
   - Paiements (si configurés)
   - Base de données Supabase

---

## 🔄 MISES À JOUR FUTURES

Pour mettre à jour votre site:

1. Modifiez les fichiers dans votre dépôt GitHub
2. Commit + Push vers GitHub
3. Netlify redéploie automatiquement (2-3 minutes)
4. Votre site est mis à jour!

---

## 🆘 DÉPANNAGE

### Le site ne se déploie pas
- Vérifiez les logs de build dans Netlify
- Assurez-vous que toutes les variables d'environnement sont configurées

### Le domaine ne fonctionne pas
- Attendez jusqu'à 48h pour la propagation DNS complète
- Vérifiez les nameservers avec: https://dnschecker.org
- Assurez-vous d'avoir enlevé l'ancien hébergement WordPress

### Les fonctionnalités ne marchent pas
- Vérifiez que les variables d'environnement Supabase sont bien configurées
- Testez d'abord avec l'URL Netlify temporaire

### SSL/HTTPS ne fonctionne pas
- Attendez 1-2 heures après la configuration du domaine
- Renouvelez le certificat dans Netlify: Domain settings → HTTPS → Renew certificate

---

## 📞 BESOIN D'AIDE?

Si vous êtes bloqué à une étape:
1. Notez l'étape exacte où vous êtes bloqué
2. Faites une capture d'écran de l'erreur
3. Demandez de l'aide en indiquant l'étape spécifique

---

## 🎉 FÉLICITATIONS!

Une fois terminé, vous aurez:
- ✅ Site moderne React déployé gratuitement
- ✅ HTTPS automatique et gratuit
- ✅ Déploiements automatiques à chaque changement
- ✅ Domaine personnalisé enginex.ma
- ✅ Performance optimale
- ✅ Base de données Supabase connectée

**Temps total: 30-60 minutes**

Votre site sera 100x plus rapide qu'avec WordPress! 🚀
