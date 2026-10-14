/*
  Cada campus agora tem :
    resumo          → frase de abertura da página
    linhaDoTempo    → [{ ano, texto }] em ordem cronológica
    historia        → array de parágrafos
    leituraEspacial → conexão com o tema da disciplina
    fotos           → [{ src, legenda, credito }]
    depoimentos     → [{ nome, vinculo, texto }] 
    fontes          → referências usadas
*/
const campiUCSal = [
  {
    slug: "palma",
    nome: "Campus da Palma",
    status: "inativo",
    coords: [-12.977683, -38.510854],
    endereco: "Largo da Palma, s/nº — Nazaré, Salvador/BA",
    periodo: "1954 – (sede administrativa até a transição para Pituaçu)",
    cursos: [
      "Filosofia (origem)",
      "Letras Anglo-Germânicas",
      "Geografia e História",
      "Pedagogia",
      "História Natural",
      "Ciclo Básico (1972–)",
    ],
    descricao:
      "Primeiro campus da UCSal, instalado no Convento de Nossa Senhora da Palma. Hoje sob os cuidados da Fraternidade Samaritanos Beneditinos.",
    resumo:
      "O ponto de partida: um convento colonial adaptado para abrigar o ensino superior católico em Salvador.",
    historia: [
      "A vida acadêmica no Convento da Palma começou antes da própria universidade. Em 1954, a Faculdade Católica de Filosofia da Bahia se instalou no imóvel, depois de obras entre 1952 e 1953 que estabilizaram o interior da igreja e da sacristia e restauraram a fachada.",
      "Em 1956 foram reconhecidos os cursos de Letras Anglo-Germânicas, Geografia e História, Pedagogia e História Natural. Em 1959, a CAPES registrava o funcionamento da Faculdade no convento, que tivera 330 estudantes no ano anterior.",
      "Com a criação da UCSal, em 1961, a Faculdade foi incorporada e a Palma virou o primeiro campus. Mesmo depois da expansão para a Lapa (1968) e a Federação (1969), ela seguiu ativa: em 1972 passou a sediar o Ciclo Básico, em 1983 ganhou biblioteca e, nos anos 1990, recebeu órgãos da Reitoria e das Pró-Reitorias.",
      "Em 2018, a Igreja e o Convento passaram aos cuidados da Fraternidade Samaritanos Beneditinos, após formalização pela Arquidiocese de Salvador.",
    ],
    linhaDoTempo: [
      {
        ano: "1952–1953",
        texto: "Obras de estabilização e restauração da fachada.",
      },
      {
        ano: "1954",
        texto:
          "Faculdade Católica de Filosofia da Bahia se instala no convento.",
      },
      { ano: "1956", texto: "Reconhecimento oficial de quatro cursos." },
      {
        ano: "1961",
        texto: "Criação da UCSal; a Palma se consolida como primeiro campus.",
      },
      {
        ano: "1972",
        texto:
          "Passa a sediar o Ciclo Básico, de formação geral dos ingressantes.",
      },
      { ano: "1983", texto: "Criação da Biblioteca da Palma." },
      {
        ano: "Anos 1990",
        texto: "Instalação de órgãos da Reitoria e das Pró-Reitorias.",
      },
      {
        ano: "2018",
        texto:
          "Igreja e Convento passam aos cuidados dos Samaritanos Beneditinos.",
      },
    ],
    leituraEspacial:
      "Representa a primeira fase de ocupação da UCSal: a adaptação de uma edificação histórica preexistente às necessidades do ensino superior, em vez de um projeto pensado para a universidade.",
    fotos: [
      // { src: "imagens/campi/palma.jpg", legenda: "Igreja e Convento da Palma", credito: "Souza (2012), Wikimedia Commons, CC BY-SA 3.0" },
    ],
    depoimentos: [],
    fontes: [
      "ALMEIDA (2021)",
      "TAVARES (2021)",
      "FLEXOR (2010), p. 202-203",
      "CAPES (1959), Boletim de março",
      "BRASIL, Decreto nº 39.919/1956",
      "ARQUIDIOCESE DE SALVADOR (2018)",
    ],
  },

  {
    slug: "lapa",
    nome: "Campus da Lapa",
    status: "inativo",
    coords: [-12.981304, -38.51251],
    endereco: "Av. Joana Angélica, 362 — Nazaré, Salvador/BA",
    periodo: "1968 – 2015/2016",
    cursos: [
      "Direito",
      "História Natural",
      "Letras",
      "Enfermagem",
      "Engenharia",
      "Pedagogia",
      "Comunicação Social",
      "Secretariado",
    ],
    descricao:
      "Instalado no Convento de Nossa Senhora da Conceição da Lapa (tombado pelo IPHAN em 1938). Atividades encerradas em 2015, com redistribuição concluída em 2016.",
    resumo:
      "A primeira expansão para além da Palma: um conjunto histórico tombado que ganhou um prédio novo nos fundos.",
    historia: [
      "Em 1968, a UCSal se instalou na área do Convento de Nossa Senhora da Conceição da Lapa, para onde foram transferidos os cursos de Direito, História Natural e Letras.",
      "A ocupação logo superou o espaço disponível no conjunto religioso. Nos fundos do convento foi construído um prédio anexo para Enfermagem, Engenharia e Pedagogia, e a antiga casa do capelão passou a abrigar a Superintendência Acadêmica. Parte do antigo quintal acabou ocupada por edificações da universidade.",
      "O campus chegou a ter também Comunicação Social e Secretariado, além de biblioteca e laboratórios de informática.",
      "As atividades no Convento da Lapa foram encerradas em 2015. Em novembro daquele ano, Letras foi transferido para a Federação; em fevereiro de 2016, a unidade de Gestão de Recursos Humanos também.",
    ],
    linhaDoTempo: [
      {
        ano: "1938",
        texto:
          "Convento e Igreja da Lapa são tombados pelo patrimônio federal.",
      },
      {
        ano: "1968",
        texto: "UCSal se instala; chegam Direito, História Natural e Letras.",
      },
      {
        ano: "Anos seguintes",
        texto: "Construção do prédio anexo nos fundos do convento.",
      },
      {
        ano: "2015",
        texto: "Encerramento das atividades; Letras vai para a Federação.",
      },
      {
        ano: "2016",
        texto: "Gestão de Recursos Humanos é transferida para a Federação.",
      },
    ],
    leituraEspacial:
      "Combinou o aproveitamento de uma edificação religiosa tombada com a construção de estruturas novas no antigo quintal, uma transição entre a adaptação pura (Palma) e a expansão planejada que viria depois.",
    fotos: [],
    depoimentos: [],
    fontes: [
      "TAVARES (2021)",
      "IPHAN (2009), Bens tombados 1938–2009",
      "UCSal, Ato nº 076/2015",
      "UCSal, Ato nº 20-A/2016",
    ],
  },

  {
    slug: "federacao",
    nome: "Campus da Federação",
    status: "inativo",
    coords: [-13.00406, -38.50047],
    endereco: "Av. Cardeal da Silva, 205 — Federação, Salvador/BA",
    periodo: "1969 – 2023",
    cursos: [
      "Direito",
      "História",
      "Filosofia",
      "Geografia",
      "Pedagogia",
      "Serviço Social",
      "Teologia",
    ],
    descricao:
      "Instalado em área vinculada ao Seminário Central São João Maria Vianney. Abrigou o Memorial da UCSal e o Laboratório Eugênio Veiga (LEV). Desativado em 2023.",
    resumo:
      "Mais de cinco décadas de ensino, biblioteca, pesquisa e preservação documental, hoje em transformação urbana.",
    historia: [
      "Instalado em 1969 na Avenida Cardeal da Silva, o campus tinha sua área física e instalações ligadas ao Seminário Central São João Maria Vianney. Com o tempo, reuniu cursos, serviços acadêmicos e estruturas de apoio, como a Biblioteca (1975) e o Memorial da UCSal, dedicado à memória institucional.",
      "Também foi espaço de pesquisa, extensão e preservação documental: em 2002 foi inaugurado o Laboratório de Conservação, Restauração e Tratamento Arquivístico Reitor Eugênio Veiga (LEV), que tratava acervo histórico da Cúria Metropolitana de Salvador. Depois, o LEV foi transferido para Pituaçu.",
      "A partir dos anos 1990, com a expansão de Pituaçu, parte das atividades migrou aos poucos. Em 2022, a gestão administrativa já estava centralizada em Pituaçu e começaram as tratativas para desativar a Federação. Segundo o relato de um ex-aluno de Direito à imprensa, a parte central do campus foi desativada primeiro e as aulas se concentraram no prédio da pós-graduação.",
      "Em agosto de 2023 a UCSal confirmou a desativação, apresentada como decisão do planejamento estratégico, motivada por aproximar a comunidade acadêmica. A mantenedora esclareceu depois que o terreno nunca pertenceu à universidade, mas ao Seminário Central.",
      "Em 2026, reportagens noticiaram que parte da área (cerca de 10 mil m²) foi adquirida pela incorporadora Moura Dubeux para um empreendimento residencial de mais de 650 unidades, dividindo o terreno com uma unidade da Smart Fit.",
    ],
    linhaDoTempo: [
      { ano: "1969", texto: "Campus instalado na Av. Cardeal da Silva." },
      { ano: "1975", texto: "Criação da Biblioteca do Campus." },
      {
        ano: "2002",
        texto:
          "Inauguração do LEV, laboratório de conservação de acervo histórico.",
      },
      {
        ano: "Anos 1990 em diante",
        texto: "Expansão de Pituaçu transfere atividades gradualmente.",
      },
      {
        ano: "2022",
        texto:
          "Gestão administrativa centralizada em Pituaçu; início das tratativas de desativação.",
      },
      { ano: "ago/2023", texto: "Desativação confirmada pela UCSal." },
      {
        ano: "2025",
        texto:
          "Resolução nº 01 do CONSUN registra o encerramento das atividades do campus.",
      },
      {
        ano: "2026",
        texto:
          "Reportagens noticiam a venda de parte do terreno para residencial da Moura Dubeux.",
      },
    ],
    leituraEspacial:
      "Ocupação compartilhada com um seminário e crescimento por etapas (biblioteca, memorial, laboratório). Sua desativação integra a reorganização que concentrou a universidade em Pituaçu.",
    fotos: [],
    depoimentos: [],
    fontes: [
      "TAVARES (2021)",
      "UCSal, Resolução CONSUN nº 01/2025",
      "UCSal, Relatório de Autoavaliação 2022 (CPA, 2023)",
      "ANOTA BAHIA (1 e 4 ago. 2023)",
      "EXAME (2026), Moura Dubeux",
      "A TARDE (10 ago. 2026)",
    ],
  },

  {
    slug: "garibaldi",
    nome: "Campus da Garibaldi",
    status: "inativo",
    coords: [-13.007, -38.495],
    endereco: "Av. Anita Garibaldi, 2981 — Rio Vermelho, Salvador/BA",
    periodo: "2004/2005 – 2014 (redistribuição)",
    cursos: [
      "Pós-graduação lato e stricto sensu",
      "Cursos de graduação tecnológica",
      "Gestão de Recursos Humanos",
    ],
    descricao:
      "Adquirido entre 2004 e 2005, voltado principalmente à pós-graduação e pesquisa. Atividades redistribuídas a partir de 2014.",
    resumo:
      "O campus da pós-graduação e da pesquisa, de vida mais curta e ligado a um momento de diversificação da universidade.",
    historia: [
      "As fontes institucionais situam a aquisição do campus entre 2004 e 2005, por isso a delimitação entre os dois anos é a mais prudente. Ele foi pensado principalmente para a pós-graduação lato e stricto sensu e, depois, passou a receber também cursos de graduação tecnológica.",
      "Tornou-se espaço de encontros e seminários científicos. Em 2007, por exemplo, sediou o III Seminário de Iniciação Científica da UCSal.",
      "A partir de 2014, as atividades foram redistribuídas: cursos tecnológicos passaram para a Lapa, restando turmas de Gestão de Recursos Humanos. Em fevereiro de 2016, essa unidade foi transferida para a Federação.",
    ],
    linhaDoTempo: [
      {
        ano: "2004/2005",
        texto: "Aquisição do campus, voltado à pós-graduação e à pesquisa.",
      },
      {
        ano: "2007",
        texto: "Sedia o III Seminário de Iniciação Científica da UCSal.",
      },
      {
        ano: "2014",
        texto: "Início da redistribuição; cursos tecnológicos vão para a Lapa.",
      },
      {
        ano: "2016",
        texto: "Unidade de Gestão de RH é transferida para a Federação.",
      },
    ],
    leituraEspacial:
      "Unidade urbana de menor porte, associada à pesquisa e à pós-graduação, que perdeu função com a redistribuição progressiva dos cursos entre os campi.",
    fotos: [],
    depoimentos: [],
    fontes: ["ALMEIDA (2021)", "UCSal, Ato nº 20-B/2016"],
  },

  {
    slug: "pituacu",
    nome: "Campus de Pituaçu",
    status: "ativo",
    coords: [-12.9485141, -38.4133785],
    endereco: "Av. Prof. Pinto de Aguiar, 2589 — Pituaçu, Salvador/BA",
    periodo: "1991 – atual",
    cursos: [
      "A maioria dos cursos de graduação e pós-graduação da UCSal atualmente",
    ],
    descricao:
      "Campus próprio da UCSal, implantado a partir de 1983/1991. Concentra hoje praticamente toda a atividade acadêmica e administrativa, incluindo o Parque Ecológico Universitário (PEU).",
    resumo:
      "O primeiro campus concebido como espaço universitário próprio e hoje o centro de toda a UCSal.",
    historia: [
      "Diferente dos campi anteriores, instalados em edificações preexistentes, Pituaçu foi pensado como um espaço universitário próprio, numa área ampla próxima ao Parque Metropolitano de Pituaçu. Em 10 de março de 1983, a CONDER formalizou a destinação da área à Associação Universitária e Cultural da Bahia, mantenedora da UCSal. Em 1991, a universidade passou a ocupar o campus.",
      "A estrutura cresceu por etapas: em 1993 começaram as medidas para o Centro Universitário Dom Lucas Moreira Neves, primeiro grande edifício; em 1999 foi instalado o Centro Dom Avelar Brandão Vilela, que permitiu transferir para lá a maior parte dos cursos de graduação.",
      "O arquiteto Daniel Colina, responsável pela primeira unidade e depois pelo Centro de Ensino 2, distribuiu os edifícios em diferentes níveis, ligados por rampas e passarelas, para acompanhar a topografia e reduzir cortes e aterros.",
      "O campus mantém um fragmento de Mata Atlântica associado ao Parque Ecológico Universitário (PEU), usado em atividades acadêmicas, científicas e de educação ambiental. A reorganização dos anos 2020, com a desativação da Federação, consolidou Pituaçu como o campus de toda a universidade.",
    ],
    linhaDoTempo: [
      { ano: "1983", texto: "CONDER destina a área à mantenedora da UCSal." },
      { ano: "1991", texto: "UCSal passa a ocupar o campus próprio." },
      {
        ano: "1993",
        texto: "Início das medidas para o Centro Dom Lucas Moreira Neves.",
      },
      {
        ano: "1999",
        texto:
          "Instalação do Centro Dom Avelar Brandão Vilela; a maioria dos cursos de graduação migra.",
      },
      {
        ano: "2022",
        texto:
          "Início da centralização da gestão e das atividades, com a desativação da Federação.",
      },
      {
        ano: "2023",
        texto:
          "Federação desativada; Pituaçu concentra as atividades da universidade.",
      },
    ],
    leituraEspacial:
      "Edifícios em níveis diferentes, articulados por rampas e passarelas, seguindo o relevo acidentado, e convivência direta entre áreas construídas e Mata Atlântica. Uma lógica bem diferente dos conventos adaptados dos primeiros campi.",
    fotos: [],
    depoimentos: [],
    fontes: [
      "LIRA (2016)",
      "ALMEIDA (2021)",
      "REVISTA PROJETO (2001), Daniel Colina",
      "UCSal, Relatório de Autoavaliação 2022 (CPA, 2023)",
    ],
  },
];

/*
  Outras universidades católicas do Brasil.
*/
const catolicasBrasil = [
  {
    slug: "puc-rio",
    nome: "PUC-Rio",
    cidade: "Rio de Janeiro/RJ",
    status: "ativo",
    coords: [-22.9784, -43.2338],
    descricao: "Pontifícia Universidade Católica do Rio de Janeiro.",
  },
  {
    slug: "puc-sp",
    nome: "PUC-SP",
    cidade: "São Paulo/SP",
    status: "ativo",
    coords: [-23.5381, -46.6705],
    descricao: "Pontifícia Universidade Católica de São Paulo.",
  },
  {
    slug: "puc-campinas",
    nome: "PUC-Campinas",
    cidade: "Campinas/SP",
    status: "ativo",
    coords: [-22.833, -47.0521],
    descricao: "Pontifícia Universidade Católica de Campinas.",
  },
  {
    slug: "puc-minas",
    nome: "PUC Minas",
    cidade: "Belo Horizonte/MG",
    status: "ativo",
    coords: [-19.9162, -44.0809],
    descricao: "Pontifícia Universidade Católica de Minas Gerais.",
  },
  {
    slug: "pucrs",
    nome: "PUCRS",
    cidade: "Porto Alegre/RS",
    status: "ativo",
    coords: [-30.056, -51.1692],
    descricao: "Pontifícia Universidade Católica do Rio Grande do Sul.",
  },
  {
    slug: "pucpr",
    nome: "PUCPR",
    cidade: "Curitiba/PR",
    status: "ativo",
    coords: [-25.4506, -49.2529],
    descricao: "Pontifícia Universidade Católica do Paraná.",
  },
  {
    slug: "puc-goias",
    nome: "PUC Goiás",
    cidade: "Goiânia/GO",
    status: "ativo",
    coords: [-16.7343585, -49.2141124],
    descricao: "Pontifícia Universidade Católica de Goiás.",
  },
  {
    slug: "ucp-petropolis",
    nome: "Universidade Católica de Petrópolis",
    cidade: "Petrópolis/RJ",
    status: "ativo",
    coords: [-22.5071105, -43.16759589],
    descricao: "Universidade católica diocesana, no Rio de Janeiro.",
  },
  {
    slug: "unisantos",
    nome: "Universidade Católica de Santos",
    cidade: "Santos/SP",
    status: "ativo",
    coords: [-23.960168, -46.3227742],
    descricao: "Universidade católica diocesana, no litoral de São Paulo.",
  },
  {
    slug: "unicap",
    nome: "Universidade Católica de Pernambuco",
    cidade: "Recife/PE",
    status: "ativo",
    coords: [-8.0557991, -34.8877079],
    descricao: "Universidade católica de tradição jesuíta.",
  },
  {
    slug: "ucdb",
    nome: "Universidade Católica Dom Bosco",
    cidade: "Campo Grande/MS",
    status: "ativo",
    coords: [-20.4169, -54.6495],
    descricao: "Universidade católica salesiana.",
  },
  {
    slug: "ucb",
    nome: "Universidade Católica de Brasília",
    cidade: "Brasília/DF",
    status: "ativo",
    coords: [-15.8651094, -48.0301378],
    descricao:
      "Única universidade particular do Distrito Federal, administrada pela UBEC.",
  },
  {
    slug: "unisinos",
    nome: "Unisinos",
    cidade: "São Leopoldo/RS",
    status: "ativo",
    coords: [-29.795011799999997, -51.1536966],
    descricao: "Universidade católica de tradição jesuíta.",
  },
  {
    slug: "lasalle",
    nome: "Universidade La Salle",
    cidade: "Canoas/RS",
    status: "ativo",
    coords: [-29.9342, -51.0992],
    descricao: "Universidade católica lassalista.",
  },
];
