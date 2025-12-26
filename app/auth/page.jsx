import { Suspense } from 'react'
import Content from './Content'
import Splash from '@/components/Splash'
export const metadata = { title: "Authentication • Nice Panda" }
const page = () => { return <Suspense fallback={<Splash />}><Content /></Suspense> }
export default page