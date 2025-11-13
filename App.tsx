import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { Plus, X, CheckCircle, Share2 } from 'lucide-react';
import './index.css';

interface Fact {
  id: string;
  category: string;
  text: string;
  source: string;
}

export default function App() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [source, setSource] = useState('');

  useEffect(() => { fetchFacts(); }, []);

  async function fetchFacts() {
    const { data } = await supabase.from('facts').select('*').order('created_at', { ascending: false });
    if (data) setFacts(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    // Tu jest klucz - używamy poprawnej nazwy 'text'!
    const { error } = await supabase.from('facts').insert([{ category, text, source }]);
    if (!error) {
      setShowForm(false); setCategory(''); setText(''); setSource('');
      fetchFacts();
    } else { alert(error.message); }
  }

  if (loading) return <div className="loading">Ładowanie...</div>;

  return (
    <div className="app-container">
      <button className="fab" onClick={() => setShowForm(true)}><Plus color="white" /></button>
      <div className="feed">
        {facts.length === 0 ? <div className="card"><h1 className="fact-text">Brak faktów. Dodaj coś!</h1></div> : 
        facts.map((fact) => (
          <div key={fact.id} className="card">
            <span className="category">{fact.category}</span>
            <h1 className="fact-text">{fact.text}</h1>
            <div className="source-badge"><CheckCircle size={16} /><span>{fact.source}</span></div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header"><h2>Dodaj fakt</h2><button onClick={() => setShowForm(false)}><X /></button></div>
            <form onSubmit={handleAdd}>
              <input placeholder="Kategoria" value={category} onChange={e => setCategory(e.target.value)} required />
              <textarea placeholder="Treść..." value={text} onChange={e => setText(e.target.value)} required />
              <input placeholder="Źródło" value={source} onChange={e => setSource(e.target.value)} required />
              <button type="submit" className="submit-btn">Wyślij</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}