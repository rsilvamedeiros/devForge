import { isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react';
import { BookOpen, Check, Copy, LoaderCircle, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { DOCUMENTATION_CHAPTERS as chapters } from './documentation-chapters';
import { REACT_DOC_VERSIONS } from './react-version-history';
import './documentation-page.css';
import './documentation-enhancements.css';

function CodeBlock({ children }: { children?: ReactNode }) {
  const [copied,setCopied]=useState(false);
  const text=isValidElement(children)?String((children.props as {children?:ReactNode}).children??''):String(children??'');
  async function copy(){await navigator.clipboard.writeText(text.replace(/\n$/,''));setCopied(true);window.setTimeout(()=>setCopied(false),1600)}
  return <div className="docs-code"><header><span><i/><i/><i/>Exemplo</span><button onClick={copy}>{copied?<><Check/>Copiado</>:<><Copy/>Copiar código</>}</button></header><pre>{children}</pre></div>;
}

export function DocumentationPage() {
  const [selected, setSelected] = useState(chapters[0]);
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const [query,setQuery]=useState('');
  const [version,setVersion]=useState(REACT_DOC_VERSIONS[0]);
  const filtered=useMemo(()=>chapters.filter(chapter=>`${chapter.title} ${chapter.description}`.toLowerCase().includes(query.toLowerCase())),[query]);

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
    <header className="docs-hero"><div><span className="eyebrow"><BookOpen/> Versioned knowledge base</span><h1>Documentação React</h1><p>Do modelo de renderização à arquitetura de aplicações modernas, com contexto para cada major do React.</p></div><div><strong>v{version.version}</strong><span>documentação ativa</span><small>{version.released} · {version.status}</small></div></header>
    <section className="react-version-toolbar panel"><div><span className="react-version-dot"/><span><small>VERSÃO DA DOCUMENTAÇÃO</small><strong>React {version.version}</strong></span></div><label><small>Consultar versão</small><span><i>R</i><select value={version.version} onChange={event=>setVersion(REACT_DOC_VERSIONS.find(item=>item.version===event.target.value)??REACT_DOC_VERSIONS[0])}>{REACT_DOC_VERSIONS.map((item,index)=><option value={item.version} key={item.version}>React {item.version}{index===0?' — atual':''} · {item.released}</option>)}</select><b>⌄</b></span></label></section>
    <article className="react-version-context"><header><span>O QUE MUDA NO REACT {version.version}</span><h2>{version.headline}</h2><p>{version.summary}</p></header><div><section><small>DESTAQUES</small>{version.changes.map(item=><p key={item}><Check/>{item}</p>)}</section><aside><small>MIGRAÇÃO</small><p>{version.migration}</p></aside></div><CodeBlock>{<code>{version.example}</code>}</CodeBlock></article>
    <div className="docs-layout">
      <aside className="panel docs-nav"><header><span>Biblioteca</span><strong>React moderno</strong><label><Search/><input aria-label="Buscar capítulo" placeholder="Buscar capítulo" value={query} onChange={event=>setQuery(event.target.value)}/></label></header><nav>{filtered.map((chapter, index) => { const Icon = chapter.icon; return <button key={chapter.path} className={selected.path === chapter.path ? 'active' : ''} onClick={() => setSelected(chapter)}><span><Icon/></span><div><small>{(index+1).toString().padStart(2,'0')}</small><strong>{chapter.title}</strong><p>{chapter.description}</p></div></button>; })}</nav><footer><BookOpen/><p>A documentação acompanha o código. A evidência continua sendo registrada na skill.</p></footer></aside>
      <main className="panel docs-reader"><header><div><span className="eyebrow">Capítulo selecionado</span><h2>{selected.title}</h2></div><span>{selected.description}</span></header>{!content && !error && <div className="docs-loading"><LoaderCircle/><span>Carregando documentação...</span></div>}{error && <div className="docs-loading"><strong>Não foi possível carregar este capítulo.</strong><button onClick={() => setSelected({ ...selected })}>Tentar novamente</button></div>}{content && <article className="markdown-body"><ReactMarkdown components={{pre:({children})=><CodeBlock>{children}</CodeBlock>}}>{content}</ReactMarkdown></article>}</main>
    </div>
  </section>;
}
