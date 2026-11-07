<!-- WerbEBIOS – Développé par @WerbHat -->
# Guide méthodologique EBIOS Risk Manager

**Version documentaire :** 1.0  
**Méthode de référence :** EBIOS Risk Manager 1.5  
**Organisme de référence :** ANSSI, avec le soutien du Club EBIOS  
**Usage :** analyse, appréciation et traitement des risques numériques  
**Classification recommandée :** Confidentiel

## 1. Objet du document

Ce guide définit une démarche opérationnelle pour conduire une analyse de risques cyber selon EBIOS Risk Manager (EBIOS RM).

Il vise à :

- Identifier les valeurs métier à protéger.
- Évaluer les conséquences d'une atteinte à ces valeurs.
- Identifier les sources de risque pertinentes.
- Étudier les menaces liées à l'écosystème.
- Construire des scénarios stratégiques et opérationnels.
- Définir les mesures de traitement.
- Décider de l'acceptabilité des risques résiduels.
- Organiser le suivi dans le temps.

Ce document est un support interne de travail. Il complète, sans le remplacer, le guide méthodologique officiel.

## 2. Principes fondamentaux

### 2.1 Partir des enjeux métier

L'analyse commence par les missions et les valeurs métier, plutôt que par une simple liste de vulnérabilités techniques.

Une même vulnérabilité peut présenter des conséquences très différentes selon le processus métier concerné.

### 2.2 Combiner socle de sécurité et scénarios

EBIOS RM associe deux approches complémentaires :

- **Approche par conformité :** vérification d'un socle de sécurité couvrant les risques courants, les exigences applicables et les bonnes pratiques retenues.
- **Approche par scénarios :** étude des attaques intentionnelles ciblées et des chemins susceptibles d'affecter les valeurs métier.

L'une ne remplace pas l'autre.

### 2.3 Associer décideurs et spécialistes

La direction et les métiers évaluent les conséquences et arbitrent les risques. Les équipes IT, sécurité, architecture, juridique et achats contribuent à l'analyse selon les sujets traités.

L'analyse ne doit pas être conduite uniquement par l'équipe informatique.

### 2.4 Documenter les hypothèses

Chaque résultat important doit être accompagné de ses sources, hypothèses, incertitudes et limites.

Une hypothèse non vérifiée ne doit pas être présentée comme un fait établi.

## 3. Préparation de l'étude

Avant le premier atelier :

1. Désigner un pilote de l'étude.
2. Identifier le commanditaire et le décideur du risque.
3. Définir l'objet étudié et les objectifs.
4. Recueillir la documentation existante.
5. Identifier les participants nécessaires.
6. Définir les échelles de gravité, de vraisemblance et d'acceptation.
7. Fixer le calendrier et les livrables.
8. Définir les règles de conservation des documents.

Les critères de cotation doivent être validés avant de noter les risques.

## 4. Atelier 1 — Cadrage et socle de sécurité

### Objectif

Définir le cadre de l'étude, le périmètre, les valeurs métier, les événements redoutés et le socle de sécurité.

### Étape 1 : cadrer l'étude

Documenter :

- Le contexte organisationnel et métier.
- Les objectifs de l'étude.
- Les limites du périmètre.
- Les exigences réglementaires et contractuelles.
- Les hypothèses structurantes.
- Les participants et responsabilités.
- Les horizons temporels stratégique et opérationnel.

### Étape 2 : identifier les valeurs métier et biens supports

Une **valeur métier** représente une information, un service ou un processus important pour l'organisation.

Un **bien support** est un élément qui contribue à cette valeur : application, infrastructure, identité, personnel, réseau, fournisseur ou site physique.

Documenter les relations entre valeurs métier et biens supports.

### Étape 3 : identifier les événements redoutés

Pour chaque valeur métier, décrire les événements susceptibles de compromettre sa mission.

Exemples :

- Indisponibilité d'un service essentiel.
- Divulgation de données confidentielles.
- Altération de données de référence.
- Perte de traçabilité d'une opération.
- Indisponibilité prolongée d'un processus industriel.

Évaluer les conséquences selon les critères définis par l'organisation.

### Étape 4 : déterminer le socle de sécurité

Identifier les exigences issues :

- Des politiques internes.
- Des référentiels applicables.
- Des obligations réglementaires.
- Des contrats.
- Des exigences d'architecture.
- Des mesures de sécurité déjà retenues.

Évaluer les écarts, les preuves disponibles et les mesures à engager.

### Livrables

- Note de cadrage.
- Cartographie des valeurs métier.
- Cartographie des biens supports.
- Liste des événements redoutés et gravités.
- Évaluation du socle de sécurité.
- Registre des hypothèses.

## 5. Atelier 2 — Sources de risque

### Objectif

Identifier les sources de risque pertinentes et les objectifs qu'elles pourraient poursuivre.

Une **source de risque (SR)** est une entité ou un facteur susceptible d'être à l'origine d'un risque. Un **objectif visé (OV)** décrit ce que cette source cherche à accomplir.

Exemples de sources de risque :

- Groupe cybercriminel.
- Concurrent malveillant.
- Activiste.
- Initié malveillant.
- Acteur étatique ou affilié.
- Prestataire compromis pouvant servir de vecteur indirect.

Exemples d'objectifs visés :

- Extorquer l'organisation.
- Dérober un savoir-faire.
- Perturber une activité essentielle.
- Altérer des données.
- Obtenir un avantage concurrentiel.

Pour chaque couple SR/OV :

1. Décrire la source de risque.
2. Décrire son objectif.
3. Évaluer sa motivation.
4. Évaluer ses ressources.
5. Examiner son activité et sa pertinence dans le contexte étudié.
6. Retenir ou écarter le couple en justifiant la décision.

### Livrables

- Cartographie des sources de risque.
- Liste des couples SR/OV retenus.
- Justification des choix et exclusions.

## 6. Atelier 3 — Scénarios stratégiques

### Objectif

Comprendre comment une source de risque pourrait exploiter l'écosystème pour atteindre son objectif.

### Étape 1 : cartographier l'écosystème

Identifier les parties prenantes :

- Fournisseurs et prestataires.
- Hébergeurs et fournisseurs cloud.
- Partenaires métier.
- Filiales et sous-traitants.
- Éditeurs logiciels.
- Services d'administration ou de maintenance.
- Organismes disposant d'un accès privilégié.

Évaluer leur exposition, leur niveau de confiance et les conséquences possibles d'une compromission.

### Étape 2 : construire les chemins d'attaque

Pour chaque couple SR/OV retenu, décrire les grandes étapes permettant d'atteindre la valeur métier.

Exemple générique :

1. Compromission d'un prestataire disposant d'un accès autorisé.
2. Utilisation de cet accès pour atteindre un environnement interne.
3. Contournement d'une séparation de privilèges insuffisante.
4. Atteinte à un service métier critique.

Il s'agit d'une hypothèse stratégique à analyser, pas d'une preuve que le chemin est effectivement exploitable.

### Étape 3 : évaluer la gravité

Relier chaque scénario aux événements redoutés et aux conséquences métier.

Déterminer les mesures possibles sur l'écosystème, notamment contractuelles, organisationnelles et techniques.

### Livrables

- Cartographie de l'écosystème.
- Scénarios stratégiques.
- Évaluation de leur gravité.
- Mesures de réduction des risques liés aux parties prenantes.

## 7. Atelier 4 — Scénarios opérationnels

### Objectif

Décliner les scénarios stratégiques en modes opératoires plausibles en tenant compte des biens supports critiques.

Pour chaque scénario :

1. Identifier les biens supports impliqués.
2. Décrire les étapes et conditions nécessaires.
3. Identifier les vulnérabilités et faiblesses susceptibles d'être exploitées.
4. Recenser les mesures de prévention et de détection existantes.
5. Examiner les dépendances entre étapes.
6. Évaluer la vraisemblance selon les critères définis.
7. Documenter les incertitudes et les preuves.
8. Consolider les risques obtenus.

L'analyse doit considérer les vulnérabilités techniques, les erreurs de configuration, les faiblesses organisationnelles et les dépendances humaines ou physiques.

### Livrables

- Scénarios opérationnels.
- Cartographie des chemins d'attaque.
- Évaluation de la vraisemblance.
- Synthèse des risques.
- Liste des mesures de sécurité complémentaires.

## 8. Atelier 5 — Traitement du risque

### Objectif

Définir la stratégie de traitement, les mesures à appliquer et le niveau de risque résiduel.

Pour chaque risque :

1. Examiner les options de traitement.
2. Définir les mesures de sécurité.
3. Évaluer le coût, les délais et les dépendances.
4. Affecter un responsable.
5. Fixer une échéance.
6. Estimer le risque résiduel.
7. Faire approuver la décision par l'autorité compétente.
8. Définir les indicateurs et les modalités de réexamen.

Les options peuvent inclure la réduction, l'évitement, le partage ou transfert approprié du risque, ou son acceptation formelle.

### Livrables

- Cartographie finale des risques.
- Plan de traitement.
- Registre des risques résiduels.
- Décisions d'acceptation.
- Cadre de suivi.

## 9. Cotation et acceptation

Les échelles sont adaptées au contexte et approuvées avant les ateliers.

Exemple d'échelle de gravité :

1. Mineure.
2. Significative.
3. Majeure.
4. Critique.

Exemple d'échelle de vraisemblance :

1. Peu vraisemblable.
2. Plausible.
3. Vraisemblable.
4. Très vraisemblable.

Ces échelles sont des exemples internes, et non des échelles universelles imposées par EBIOS RM.

Une matrice gravité/vraisemblance peut aider à prioriser les risques. Elle ne remplace pas le jugement métier, les critères d'acceptation ni les obligations applicables.

## 10. Gouvernance et amélioration continue

Les risques doivent être réexaminés lorsque :

- Le périmètre évolue.
- Une nouvelle menace pertinente apparaît.
- Un incident survient.
- Une vulnérabilité majeure est découverte.
- Un fournisseur ou une dépendance change.
- Une mesure est mise en œuvre.
- Une hypothèse importante est invalidée.

La fréquence de revue est définie dans le cadrage et ajustée au niveau de risque.

## 11. Références

- Guide officiel EBIOS RM : [https://cyber.gouv.fr/securisation/analyse-des-risques/methode-ebios-rm/](https://cyber.gouv.fr/securisation/analyse-des-risques/methode-ebios-rm/)
- Guide et ressources complémentaires : https://messervices.cyber.gouv.fr/
- ISO 31000:2018 — Management du risque.
- ISO/IEC 27005:2022 — Gestion des risques de sécurité de l'information.

**Fin du document.**