import { useState, useEffect, useCallback } from "react";

const BASE = import.meta.env.VITE_API_URL;

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [rP, rF, rA, rM] = await Promise.all([
        fetch(`${BASE}/personnes`),
        fetch(`${BASE}/familles`),
        fetch(`${BASE}/apvs`),
        fetch(`${BASE}/mariages`),
      ]);
      if (!rP.ok || !rF.ok || !rA.ok || !rM.ok)
        throw new Error("Erreur serveur");
      const [personnes, familles, apvs, mariages] = await Promise.all([
        rP.json(),
        rF.json(),
        rA.json(),
        rM.json(),
      ]);

      // Stats de base
      const totalPersonnes = personnes.length;
      const totalFamilles = familles.length;
      const totalApvs = apvs.length;
      const totalMariages = mariages.length;

      // Répartition par type
      const parType = ["pere", "mere", "enfant", "autre"].map((t) => ({
        type: t.charAt(0).toUpperCase() + t.slice(1),
        count: personnes.filter((p) => p.type === t).length,
      }));

      // Sacrements
      const sacrements = [
        {
          label: "Baptisés",
          key: "bapteme",
          count: personnes.filter((p) => p.bapteme).length,
        },
        {
          label: "Communion",
          key: "communion",
          count: personnes.filter((p) => p.communion).length,
        },
        {
          label: "Confirmés",
          key: "confirmation",
          count: personnes.filter((p) => p.confirmation).length,
        },
      ];

      // Top 5 familles par nb membres
      const topFamilles = [...familles]
        .sort((a, b) => (b.Personnes?.length || 0) - (a.Personnes?.length || 0))
        .slice(0, 5);

      // 5 derniers membres (par id décroissant)
      const derniersPersonnes = [...personnes]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

      // Familles sans mariage
      const famillesAvecMariage = new Set(mariages.map((m) => m.famille_id));
      const sansMarriage = familles.filter(
        (f) => !famillesAvecMariage.has(f.id),
      ).length;

      // % baptisés
      const pctBaptise =
        totalPersonnes > 0
          ? Math.round(
              (personnes.filter((p) => p.bapteme).length / totalPersonnes) *
                100,
            )
          : 0;

      setData({
        totalPersonnes,
        totalFamilles,
        totalApvs,
        totalMariages,
        parType,
        sacrements,
        topFamilles,
        derniersPersonnes,
        sansMarriage,
        pctBaptise,
        personnes,
        familles,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { data, loading, error };
}
