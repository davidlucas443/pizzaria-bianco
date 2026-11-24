import type { Brand, ContactConfig, Heading, Image, Navigation, TextItem, UI } from './types';
export interface Professional { name: string; role: string; bio: string; registration: string; image: Image | null }
interface SiteConfig {
  brand: Brand; meta: { title: string; description: string }; demoNotice: string;
  sections: Record<'office' | 'people' | 'process' | 'faq', boolean>;
  contact: ContactConfig; ui: UI; navigation: Navigation[];
  hero: Heading & { image: Image; caption: string; note: string };
  practice: Heading & { items: TextItem[] };
  office: Heading & { paragraphs: string[]; principle: string };
  people: Heading & { empty: string; items: Professional[] };
  process: Heading & { items: TextItem[] };
  faq: Heading & { items: { question: string; answer: string }[] };
  visit: Heading;
}
export const siteConfig: SiteConfig = {
  brand: { name: 'Almeida & Prado', subtitle: 'Advocacia e consultoria', logo: null },
  meta: { title: 'Almeida & Prado | Advocacia e consultoria', description: 'Orientação jurídica com escuta, clareza e atenção a cada contexto. Conheça as áreas de atuação. Escritório ilustrativo.' },
  demoNotice: 'Demonstração · Escritório e serviços ilustrativos. Não constitui orientação jurídica.',
  sections: { office: true, people: true, process: true, faq: true },
  contact: { whatsapp: '', phone: '', instagram: '', address: '', hours: 'Segunda a sexta · 9h às 18h · Sob agendamento', message: 'Olá! Gostaria de consultar a disponibilidade para um atendimento jurídico.' },
  ui: { skip: 'Pular para o conteúdo', openMenu: 'Abrir menu', closeMenu: 'Fechar menu', close: 'Fechar aviso', backTop: 'Voltar ao início', primary: 'Solicitar atendimento', secondary: 'Conheça a atuação', map: 'Como chegar', phone: 'Contato por telefone', instagram: 'Instagram', unavailableTitle: 'Atendimento ainda não disponível', unavailableText: 'Este escritório é ilustrativo. Os canais de contato não foram configurados. Nenhuma solicitação será enviada.', addressEmpty: 'Endereço a confirmar', contactEmpty: 'Canais indisponíveis nesta demonstração.', hoursLabel: 'Atendimento', addressLabel: 'O escritório' },
  navigation: [{ label: 'Atuação', id: 'atuacao' }, { label: 'Escritório', id: 'escritorio', section: 'office' }, { label: 'Dúvidas', id: 'duvidas', section: 'faq' }, { label: 'Contato', id: 'contato' }],
  hero: { eyebrow: 'Escuta atenta. Orientação responsável.', title: 'Clareza para decisões que importam.', text: 'Cada questão jurídica tem um contexto. Nosso trabalho começa por entender o seu, para orientar os próximos passos com cuidado e transparência.', image: { src: './images/escritorio.webp', alt: 'Corredor de escritório com divisórias de vidro e luz natural' }, caption: 'Um espaço para ouvir e compreender.', note: 'Pessoas, famílias e negócios.' },
  practice: { eyebrow: 'Áreas de atuação', title: 'O direito presente no seu dia a dia.', text: 'Orientação e acompanhamento em questões pessoais e empresariais, com atenção às particularidades de cada demanda.', items: [
    { title: 'Direito civil', text: 'Análise de contratos, responsabilidades e relações privadas. Apoio para compreender direitos e deveres antes de decidir.' },
    { title: 'Família e sucessões', text: 'Acompanhamento de questões familiares, planejamento sucessório e inventários, com escuta e respeito às pessoas envolvidas.' },
    { title: 'Direito do consumidor', text: 'Orientação sobre relações de consumo, contratos de serviços e conflitos entre consumidores e fornecedores.' },
    { title: 'Consultoria empresarial', text: 'Apoio na análise de contratos e na organização jurídica de decisões cotidianas do negócio.' },
  ] },
  office: { eyebrow: 'O escritório', title: 'Proximidade no diálogo. Critério na orientação.', text: 'Uma relação de confiança começa com uma conversa clara.', paragraphs: ['A proposta do Almeida & Prado é unir atenção ao contexto de cada pessoa e análise cuidadosa das questões apresentadas. O primeiro compromisso é tornar o caminho compreensível.', 'Etapas, documentos, possibilidades e limites são conversados de forma objetiva. A atuação é definida após a análise do caso e a formalização das condições de atendimento.'], principle: 'Ouvir com atenção. Explicar com clareza. Atuar com responsabilidade.' },
  people: { eyebrow: 'Profissionais', title: 'Quem acompanha sua demanda.', text: 'O atendimento é conduzido pelo profissional responsável pela área, com comunicação direta e atenção às informações compartilhadas.', empty: 'Identificação e registros profissionais não informados nesta demonstração.', items: [] },
  process: { eyebrow: 'Como funciona', title: 'Uma conversa de cada vez.', text: 'Do primeiro contato à definição dos próximos passos, você entende o que está sendo tratado.', items: [
    { title: 'Contato inicial', text: 'Conte, de forma breve, o assunto que deseja tratar. A equipe informa a disponibilidade e as condições para uma consulta.' },
    { title: 'Escuta e análise', text: 'Na consulta, o contexto e os documentos relevantes são analisados para compreender sua necessidade.' },
    { title: 'Definição dos caminhos', text: 'As possibilidades, os limites da atuação e os honorários são apresentados antes de qualquer contratação.' },
  ] },
  faq: { eyebrow: 'Dúvidas frequentes', title: 'Antes da primeira conversa.', text: 'Informações para preparar seu atendimento.', items: [
    { question: 'Como solicitar uma consulta?', answer: 'Entre em contato pelo canal de atendimento para informar o assunto e consultar os horários. O agendamento depende de confirmação.' },
    { question: 'Quais documentos preciso apresentar?', answer: 'Os documentos variam conforme a demanda. No contato inicial, informe a natureza do assunto para receber orientação sobre o que reunir. Evite enviar dados sensíveis antes da confirmação do canal.' },
    { question: 'Como são definidos os honorários?', answer: 'As condições e os honorários são apresentados conforme o escopo da consulta ou da atuação, antes da contratação.' },
    { question: 'Existe garantia de resultado?', answer: 'Não. A análise e a atuação jurídica dependem das circunstâncias de cada caso e de fatores externos. As possibilidades e limitações são discutidas com transparência.' },
  ] },
  visit: { eyebrow: 'Contato', title: 'Vamos entender o seu momento.', text: 'Para consultar a disponibilidade de atendimento, apresente brevemente o assunto. O primeiro contato não substitui uma consulta e não formaliza a contratação.' },
};
