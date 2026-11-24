import { Layout } from './components/Layout';
import { Hero, Office, People } from './components/Editorial';
import { Practice, Process, FAQ } from './components/Practice';
import { Contact } from './components/Contact';
import { siteConfig as c } from './content/site';
export default function App() {
  return <Layout><Hero /><Practice />{c.sections.office && <Office />}{c.sections.people && <People />}{c.sections.process && <Process />}{c.sections.faq && <FAQ />}<Contact /></Layout>;
}
