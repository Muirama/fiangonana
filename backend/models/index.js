const Apv     = require('./Apv');
const Famille = require('./Famille');
const Personne= require('./Personne');
const Mariage = require('./Mariage');

// APV → Familles
Apv.hasMany(Famille, { foreignKey: 'apv_id' });
Famille.belongsTo(Apv, { foreignKey: 'apv_id' });

// Famille → Personnes
Famille.hasMany(Personne, { foreignKey: 'famille_id' });
Personne.belongsTo(Famille, { foreignKey: 'famille_id' });

// Famille → Mariage (1:1)
Famille.hasOne(Mariage, { foreignKey: 'famille_id' });
Mariage.belongsTo(Famille, { foreignKey: 'famille_id' });

module.exports = { Apv, Famille, Personne, Mariage };