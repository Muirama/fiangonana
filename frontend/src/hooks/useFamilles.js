import { useState, useEffect, useCallback } from "react";

const API = `${import.meta.env.VITE_API_URL}/familles`;
const API_APV = `${import.meta.env.VITE_API_URL}/apvs`;

export function useFamilles() {
  const [familles, setFamilles] = useState([]);
  const [apvs, setApvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resFam, resApv] = await Promise.all([fetch(API), fetch(API_APV)]);
      if (!resFam.ok || !resApv.ok) throw new Error("Erreur serveur");
      const [famData, apvData] = await Promise.all([
        resFam.json(),
        resApv.json(),
      ]);
      setFamilles(famData);
      setApvs(apvData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const createFamille = async (form) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("Erreur création");
    await fetchAll();
  };

  const updateFamille = async (id, form) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("Erreur modification");
    await fetchAll();
  };

  const deleteFamille = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur suppression");
    await fetchAll();
  };

  return {
    familles,
    apvs,
    loading,
    error,
    createFamille,
    updateFamille,
    deleteFamille,
  };
}
