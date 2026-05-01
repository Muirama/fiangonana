import { useState, useEffect, useCallback } from "react";

const API = `${import.meta.env.VITE_API_URL}/mariages`;
const API_FAMILLE = `${import.meta.env.VITE_API_URL}/familles`;

export function useMariages() {
  const [mariages, setMariages] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resM, resF] = await Promise.all([fetch(API), fetch(API_FAMILLE)]);
      if (!resM.ok || !resF.ok) throw new Error("Erreur serveur");
      const [mData, fData] = await Promise.all([resM.json(), resF.json()]);
      setMariages(mData);
      // Garde seulement les familles qui ont père ET mère
      setFamilles(
        fData.filter((f) => {
          const p = f.Personnes || [];
          return (
            p.some((m) => m.type === "pere") && p.some((m) => m.type === "mere")
          );
        }),
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const saveMariage = async (form) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Erreur sauvegarde");
    }
    await fetchAll();
  };

  const deleteMariage = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur suppression");
    await fetchAll();
  };

  return { mariages, familles, loading, error, saveMariage, deleteMariage };
}
