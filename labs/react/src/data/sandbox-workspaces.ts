export interface SandboxFile{name:string;language:string;content:string}export interface SandboxCheck{label:string;file:string;pattern:RegExp;hint:string}export interface SandboxWorkspace{id:string;level:string;title:string;description:string;requirements:string[];files:SandboxFile[];checks:SandboxCheck[]}
export const SANDBOX_WORKSPACES:SandboxWorkspace[]=[
{id:'course-card',level:'Júnior',title:'Course Card acessível',description:'Complete um componente tipado com composição, estado e teste de comportamento.',requirements:['Props readonly','Favorito com updater','Consulta por role no teste'],files:[{name:'course-card.tsx',language:'tsx',content:`import { useState } from 'react';
type Props = Readonly<{ title: string; hours: number }>;
export function CourseCard({ title, hours }: Props) {
  const [favorite, setFavorite] = useState(false);
  // TODO: renderize article, título, carga e botão acessível
  return null;
}`},{name:'course-card.css',language:'css',content:`.course-card {
  /* TODO: grid, tokens e focus-visible */
}`},{name:'course-card.spec.tsx',language:'tsx',content:`import { render, screen } from '@testing-library/react';
describe('CourseCard', () => {
  it('toggles favorite', async () => {
    // TODO: render, click e assert
  });
});`},{name:'index.ts',language:'typescript',content:`export { CourseCard } from './course-card';`}],checks:[{label:'Retorna elemento semântico',file:'course-card.tsx',pattern:/<article/,hint:'Use article como raiz.'},{label:'Updater function',file:'course-card.tsx',pattern:/setFavorite\s*\(\s*\w+\s*=>/,hint:'Atualize a partir do valor anterior.'},{label:'Foco visível',file:'course-card.css',pattern:/:focus-visible/,hint:'Estilize :focus-visible.'},{label:'Teste por role',file:'course-card.spec.tsx',pattern:/getByRole|findByRole/,hint:'Consulte o botão por role e nome.'}]},
{id:'course-search',level:'Pleno',title:'Busca com server state',description:'Coordene URL, query key e estados assíncronos sem duplicar informação.',requirements:['URL como fonte de verdade','Query key completa','Loading, erro e vazio'],files:[{name:'course-search.tsx',language:'tsx',content:`import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
export function CourseSearch() {
  const [params, setParams] = useSearchParams();
  const search = params.get('q') ?? '';
  // TODO: query e estados da interface
  return null;
}`},{name:'course-api.ts',language:'typescript',content:`export async function listCourses(search: string) {
  const response = await fetch('/api/courses?q=' + encodeURIComponent(search));
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}`},{name:'course-search.spec.tsx',language:'tsx',content:`describe('CourseSearch', () => {
  it('shows an empty state', async () => {
    // TODO: render com Router e QueryClient
  });
});`},{name:'query-keys.ts',language:'typescript',content:`export const courseKeys = {
  all: ['courses'] as const,
  // TODO: list(search)
};`}],checks:[{label:'Search params usados',file:'course-search.tsx',pattern:/setParams\s*\(/,hint:'Atualize a URL ao pesquisar.'},{label:'useQuery configurado',file:'course-search.tsx',pattern:/useQuery\s*\(/,hint:'Crie a query declarativa.'},{label:'Estado vazio',file:'course-search.tsx',pattern:/isError|isPending/,hint:'Trate loading e erro explicitamente.'},{label:'Query key com filtro',file:'query-keys.ts',pattern:/list\s*:/,hint:'Adicione factory list(search).'}]},
{id:'feature-boundary',level:'Sênior',title:'Feature boundary',description:'Crie uma fronteira pública, Error Boundary e mutation otimista com rollback.',requirements:['Exports públicos explícitos','Rollback em erro','Recuperação localizada'],files:[{name:'index.ts',language:'typescript',content:`// TODO: exporte apenas contratos públicos da feature
`},{name:'course-mutation.ts',language:'typescript',content:`export function useEnrollCourse() {
  // TODO: useMutation com onMutate, onError e onSettled
}`},{name:'course-boundary.tsx',language:'tsx',content:`export function CourseBoundary({ children }) {
  // TODO: Error Boundary com ação de retry
  return children;
}`},{name:'course-mutation.spec.tsx',language:'tsx',content:`describe('useEnrollCourse', () => {
  it('rolls back when the request fails', async () => {
    // TODO: prove o rollback do cache
  });
});`}],checks:[{label:'Barrel explícito',file:'index.ts',pattern:/export\s*\{/,hint:'Exporte contratos nomeados.'},{label:'Snapshot otimista',file:'course-mutation.ts',pattern:/onMutate/,hint:'Capture o cache anterior.'},{label:'Rollback',file:'course-mutation.ts',pattern:/onError/,hint:'Restaure no onError.'},{label:'Falha testada',file:'course-mutation.spec.tsx',pattern:/reject|error|fail/i,hint:'Simule a rejeição da mutation.'}]},
];
