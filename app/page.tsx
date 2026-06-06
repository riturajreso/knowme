import { getAllPostsMeta } from '@/lib/posts'
import HomeClient from './HomeClient'

export default function Page() {
  const knowledgeItems = getAllPostsMeta()
  return <HomeClient knowledgeItems={knowledgeItems} />
}
