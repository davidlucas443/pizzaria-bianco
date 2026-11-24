import { Layout } from './components/Layout';
import { Hero, Benefits, About, Process } from './components/Experience';
import { Properties } from './components/Properties';
import { Contact } from './components/Contact';
import { siteConfig as c } from './content/site';
export default function App() {
  return <Layout><Hero /><Properties />{c.sections.benefits && <Benefits />}{c.sections.about && <About />}{c.sections.process && <Process />}<Contact /></Layout>;
}
