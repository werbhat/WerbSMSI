<!-- WerbSMSI – Développé par @WerbHat -->
# Supports de prise en main WerbSMSI

Documents pour présenter WerbSMSI et le prendre en main. Toutes les captures d'écran viennent de l'**espace de démonstration** et des **bases d'exemple** des modules : **données fictives**.

| Support | Pour qui | Contenu |
|---|---|---|
| [Recueil des guides](guides/Recueil_guides_WerbSMSI.html) (page HTML autonome, hors ligne) | Tous : à ouvrir dans un onglet à côté de WerbSMSI | Les guides du portail, le guide technique et les guides de tous les modules (référentiels compris), classés par étape de la démarche ; recherche plein texte avec surlignage (touche `/`), sommaire de chaque guide, liens entre guides, images intégrées ; thème Auto / Clair / Sombre. Ouvert depuis le portail (*❓ Aide › Recueil de tous les guides*) ; `?theme=sombre` ou `?theme=clair` impose un thème. |
| [Présentation technique](presentation_technique/Presentation_Technique_WerbSMSI.pptx) (56 diapositives ; [version PDF](presentation_technique/Presentation_Technique_WerbSMSI.pdf)) | Ceux qui installent et font vivre WerbSMSI : technicien, informaticien de site, intégrateur, référent cyber | Principes, 7 étapes de mise en place, sécurisation du dossier par conteneur VeraCrypt, portail, une diapositive par module avec capture, échanges entre modules, gestes du quotidien, 30 premiers jours, rythme, dépannage, glossaire. Notes de l'orateur. |
| [Guide technique](presentation_technique/Guide_technique_WerbSMSI.md) | Le même, à garder sous la main | Version écrite et détaillée de la présentation, avec les captures. |
| [Cartographie des échanges](cartographie/Cartographie_echanges_WerbSMSI.pdf) (A4 portrait, 2 pages) | Tous, et les autres guides | Page 1 : schéma des échanges (groupe, WerbMap, modules du site, synthèses). Page 2 : table objet publié × module lecteur. Images : [schéma](cartographie/cartographie_p1.png), [table](cartographie/cartographie_p2.png). |
| [Présentation au comité de validation](presentation_comite/Presentation_Comite_WerbSMSI.pptx) (15 diapositives ; [version PDF](presentation_comite/Presentation_Comite_WerbSMSI.pdf)) | Direction, comité de validation | Démarche de mise en œuvre et de gestion : décisions attendues, parcours, feuille de route, organisation, rythme. |
| Vidéo de démonstration | Tous | *Lien à compléter* — la vidéo n'est pas versionnée dans le dépôt. |

Ces documents sont **produits** par les scripts de l'atelier `docs_build/` (non versionné) : ne pas les modifier à la main, les régénérer. Le recueil des guides est produit par `charte/outils/werb_charte.py recueil`, lancé aussi à chaque `publier` et `portail` (charte §7.4).
