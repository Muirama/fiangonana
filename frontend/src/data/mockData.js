// Mock data - sera remplacé par les appels API backend

export const mockStats = {
  totalMembres: 248,
  familles: 67,
  nouveauxCeMois: 5,
  tauxPresence: 78,
};

export const mockMembres = [
  {
    id: 1,
    nom: "Rakoto",
    prenom: "Jean",
    famille: "Rakoto",
    statut: "Actif",
    role: "Diacre",
    quartier: "Ambohimanarina",
    telephone: "+261 34 12 345 67",
    dateAdhesion: "2018-03-15",
  },
  {
    id: 2,
    nom: "Rasoa",
    prenom: "Marie",
    famille: "Rasoa",
    statut: "Actif",
    role: "Membre",
    quartier: "Ankorondrano",
    telephone: "+261 32 98 765 43",
    dateAdhesion: "2020-06-01",
  },
  {
    id: 3,
    nom: "Rabe",
    prenom: "Paul",
    famille: "Rabe",
    statut: "Actif",
    role: "Lecteur",
    quartier: "Ambanidia",
    telephone: "+261 33 56 789 01",
    dateAdhesion: "2019-11-20",
  },
  {
    id: 4,
    nom: "Rakotondrabe",
    prenom: "Hery",
    famille: "Rakotondrabe",
    statut: "Inactif",
    role: "Membre",
    quartier: "Ambohibao",
    telephone: "+261 34 22 333 44",
    dateAdhesion: "2021-01-10",
  },
  {
    id: 5,
    nom: "Randria",
    prenom: "Miora",
    famille: "Randria",
    statut: "Actif",
    role: "Catéchiste",
    quartier: "Tsiadana",
    telephone: "+261 32 77 888 99",
    dateAdhesion: "2017-08-05",
  },
  {
    id: 6,
    nom: "Raharison",
    prenom: "Lanto",
    famille: "Raharison",
    statut: "Actif",
    role: "Membre",
    quartier: "Antanimena",
    telephone: "+261 33 44 555 66",
    dateAdhesion: "2022-02-14",
  },
  {
    id: 7,
    nom: "Rabemanantsoa",
    prenom: "Fanja",
    famille: "Rabemanantsoa",
    statut: "Actif",
    role: "Choriste",
    quartier: "Mahamasina",
    telephone: "+261 34 66 777 88",
    dateAdhesion: "2020-09-30",
  },
  {
    id: 8,
    nom: "Andrianarivelo",
    prenom: "Tiana",
    famille: "Andrianarivelo",
    statut: "Catéchumène",
    role: "Catéchumène",
    quartier: "Isotry",
    telephone: "+261 32 11 222 33",
    dateAdhesion: "2024-01-15",
  },
];

export const mockFamilles = [
  {
    id: 1,
    nom: "Famille Rakoto",
    chef: "Rakoto Jean",
    membres: 4,
    quartier: "Ambohimanarina",
    statut: "Actif",
  },
  {
    id: 2,
    nom: "Famille Rasoa",
    chef: "Rasoa Marie",
    membres: 3,
    quartier: "Ankorondrano",
    statut: "Actif",
  },
  {
    id: 3,
    nom: "Famille Randria",
    chef: "Randria Miora",
    membres: 5,
    quartier: "Tsiadana",
    statut: "Actif",
  },
  {
    id: 4,
    nom: "Famille Rabe",
    chef: "Rabe Paul",
    membres: 2,
    quartier: "Ambanidia",
    statut: "Actif",
  },
  {
    id: 5,
    nom: "Famille Rakotondrabe",
    chef: "Rakotondrabe Hery",
    membres: 6,
    quartier: "Ambohibao",
    statut: "Inactif",
  },
];

export const mockEventsRecents = [
  {
    id: 1,
    titre: "Messe dominicale",
    date: "2026-04-13",
    type: "Messe",
    participants: 186,
  },
  {
    id: 2,
    titre: "Réunion des diacres",
    date: "2026-04-10",
    type: "Réunion",
    participants: 12,
  },
  {
    id: 3,
    titre: "Catéchisme adultes",
    date: "2026-04-08",
    type: "Formation",
    participants: 34,
  },
  {
    id: 4,
    titre: "Chemin de croix",
    date: "2026-04-05",
    type: "Prière",
    participants: 210,
  },
];

export const mockPresenceData = [
  { mois: "Nov", presence: 72 },
  { mois: "Déc", presence: 85 },
  { mois: "Jan", presence: 68 },
  { mois: "Fév", presence: 74 },
  { mois: "Mar", presence: 80 },
  { mois: "Avr", presence: 78 },
];

export const roleColors = {
  Diacre: { bg: "bg-violet-100", text: "text-violet-700" },
  Lecteur: { bg: "bg-blue-100", text: "text-blue-700" },
  Catéchiste: { bg: "bg-amber-100", text: "text-amber-700" },
  Choriste: { bg: "bg-pink-100", text: "text-pink-700" },
  Membre: { bg: "bg-gray-100", text: "text-gray-600" },
  Catéchumène: { bg: "bg-green-100", text: "text-green-700" },
};

export const statutColors = {
  Actif: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Inactif: { bg: "bg-red-100", text: "text-red-600" },
  Catéchumène: { bg: "bg-sky-100", text: "text-sky-700" },
};
