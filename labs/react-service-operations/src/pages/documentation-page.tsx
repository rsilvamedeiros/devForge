import { useEffect, useState } from 'react';
import { BookOpen, LoaderCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { DOCUMENTATION_CHAPTERS as chapters } from './documentation-chapters';
import './documentation-page.css';


export function DocumentationPage() {
  const [selected, setSelected] = useState(chapters[0]);
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setContent('');
    setError(false);
    fetch(selected.path, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(`Documentation request failed: ${response.status}`);
        return response.text();
      })
      .then(setContent)
      .catch(requestError => {
        if ((requestError as Error).name !== 'AbortError') setError(true);
      });
    return () => controller.abort();
  }, [selected]);

  return <section className="page docs-page">
    <header className="docs-hero"><div><span className="eyebrow"><BookOpen/> React knowledge base</span><h1>Documentação React</h1><p>Do modelo de renderização à arquitetura do Nexa Ops, com conceitos, decisões e exemplos em um só lugar.</p></div><div><strong>{chapters.length}</strong><span>capítulos técnicos</span><small>Referência viva do laboratório</small></div></header>
    <div className="docs-layout">
      <aside className="panel docs-nav"><header><span>Biblioteca</span><strong>React moderno</strong></header><nav>{chapters.map((chapter, index) => { const Icon = chapter.icon; return <button key={chapter.path} className={selected.path === chapter.path ? 'active' : ''} onClick={() => setSelected(chapter)}><span><Icon/></span><div><small>0{index + 1}</small><strong>{chapter.title}</strong><p>{chapter.description}</p></div></button>; })}</nav><footer><BookOpen/><p>A documentação acompanha o código. A evidência continua sendo registrada na skill.</p></footer></aside>
      <main className="panel docs-reader"><header><div><span className="eyebrow">Capítulo selecionado</span><h2>{selected.title}</h2></div><span>{selected.description}</span></header>{!content && !error && <div className="docs-loading"><LoaderCircle/><span>Carregando documentação...</span></div>}{error && <div className="docs-loading"><strong>Não foi possível carregar este capítulo.</strong><button onClick={() => setSelected({ ...selected })}>Tentar novamente</button></div>}{content && <article className="markdown-body"><ReactMarkdown>{content}</ReactMarkdown></article>}</main>
    </div>
  </section>;
}
