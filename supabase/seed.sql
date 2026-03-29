insert into subjects (id, name_pt, name_en, summary_pt, summary_en)
values
  ('agentes-inteligentes', 'Agentes Inteligentes', 'Intelligent Agents', 'Fundamentos para sistemas autônomos, orquestração multiagente e padrões de raciocínio.', 'Foundations for autonomous systems, multi-agent orchestration, and reasoning patterns.'),
  ('large-language-models', 'Large Language Models', 'Large Language Models', 'Base de modelos, inferência eficiente e práticas de fine-tuning para aplicações reais.', 'Model foundations, efficient inference, and fine-tuning practices for real applications.'),
  ('visao-computacional', 'Visão Computacional', 'Computer Vision', 'Da visão clássica à detecção e segmentação modernas para aplicações de IA visual.', 'From classical vision to modern detection and segmentation for visual AI applications.')
on conflict (id) do update
set
  name_pt = excluded.name_pt,
  name_en = excluded.name_en,
  summary_pt = excluded.summary_pt,
  summary_en = excluded.summary_en;

insert into repositories (id, subject_id, full_name, url, language, stars, last_activity, level, tags, why_pt, why_en)
values
  ('langchain', 'agentes-inteligentes', 'langchain-ai/langchain', 'https://github.com/langchain-ai/langchain', 'Python', 98000, '2026-03-28', 'foundation', '{agents,llm,framework}', 'Base prática para criar agentes com memória, ferramentas e cadeias de execução.', 'Practical base to build agents with memory, tools, and execution chains.'),
  ('crewai', 'agentes-inteligentes', 'crewAIInc/crewAI', 'https://github.com/crewAIInc/crewAI', 'Python', 26000, '2026-03-27', 'intermediate', '{multi-agent,orchestration}', 'Excelente para estudar colaboração entre agentes com papéis e objetivos distintos.', 'Great to study collaboration between agents with distinct roles and goals.'),
  ('autogen', 'agentes-inteligentes', 'microsoft/autogen', 'https://github.com/microsoft/autogen', 'Python', 40000, '2026-03-26', 'advanced', '{agentic,research}', 'Referência para fluxos agentic mais complexos com foco em pesquisa e prototipação.', 'Reference for more complex agentic workflows focused on research and prototyping.'),
  ('openai-agents', 'agentes-inteligentes', 'openai/openai-agents-python', 'https://github.com/openai/openai-agents-python', 'Python', 9000, '2026-03-25', 'foundation', '{agents,sdk}', 'Mostra padrões modernos de agentes com foco em fluxo de ferramentas e observabilidade.', 'Shows modern agent patterns focused on tool flows and observability.'),

  ('transformers', 'large-language-models', 'huggingface/transformers', 'https://github.com/huggingface/transformers', 'Python', 140000, '2026-03-28', 'foundation', '{nlp,llm,foundation}', 'Biblioteca central para estudar arquitetura, treinamento e avaliação de LLMs.', 'Core library to study architecture, training, and evaluation of LLMs.'),
  ('llama-cpp', 'large-language-models', 'ggerganov/llama.cpp', 'https://github.com/ggerganov/llama.cpp', 'C++', 75000, '2026-03-29', 'intermediate', '{inference,edge,performance}', 'Essencial para entender inferência local, quantização e eficiência de runtime.', 'Essential to understand local inference, quantization, and runtime efficiency.'),
  ('vllm', 'large-language-models', 'vllm-project/vllm', 'https://github.com/vllm-project/vllm', 'Python', 43000, '2026-03-27', 'advanced', '{serving,throughput}', 'Foco em serving de LLM com alto throughput para cenários de produção.', 'Focused on high-throughput LLM serving for production scenarios.'),
  ('trl', 'large-language-models', 'huggingface/trl', 'https://github.com/huggingface/trl', 'Python', 13000, '2026-03-24', 'advanced', '{rlhf,alignment}', 'Permite estudar alinhamento, RLHF e técnicas de pós-treinamento.', 'Enables study of alignment, RLHF, and post-training techniques.'),

  ('opencv', 'visao-computacional', 'opencv/opencv', 'https://github.com/opencv/opencv', 'C++', 82000, '2026-03-28', 'foundation', '{cv,image-processing}', 'Biblioteca histórica e indispensável para fundamentos de visão computacional.', 'Historic and indispensable library for computer vision fundamentals.'),
  ('detectron2', 'visao-computacional', 'facebookresearch/detectron2', 'https://github.com/facebookresearch/detectron2', 'Python', 34000, '2026-03-23', 'intermediate', '{detection,segmentation}', 'Referência acadêmica para detecção de objetos e segmentação de instâncias.', 'Academic reference for object detection and instance segmentation.'),
  ('ultralytics', 'visao-computacional', 'ultralytics/ultralytics', 'https://github.com/ultralytics/ultralytics', 'Python', 47000, '2026-03-29', 'foundation', '{yolo,real-time}', 'Ótimo para visão aplicada, prototipação rápida e cenários em tempo real.', 'Great for applied vision, rapid prototyping, and real-time scenarios.'),
  ('mmseg', 'visao-computacional', 'open-mmlab/mmsegmentation', 'https://github.com/open-mmlab/mmsegmentation', 'Python', 10000, '2026-03-25', 'advanced', '{segmentation,openmmlab}', 'Excelente para estudar pipelines robustos de segmentação semântica.', 'Excellent to study robust semantic segmentation pipelines.')
on conflict (id) do update
set
  subject_id = excluded.subject_id,
  full_name = excluded.full_name,
  url = excluded.url,
  language = excluded.language,
  stars = excluded.stars,
  last_activity = excluded.last_activity,
  level = excluded.level,
  tags = excluded.tags,
  why_pt = excluded.why_pt,
  why_en = excluded.why_en;

insert into repo_updates (id, repo_full_name, repo_url, updated_at, summary_pt, summary_en)
values
  ('up-1', 'vllm-project/vllm', 'https://github.com/vllm-project/vllm', '2026-03-29T13:10:00Z', 'Melhorias de performance no serving com otimizações de scheduler.', 'Serving performance improvements with scheduler optimizations.'),
  ('up-2', 'ultralytics/ultralytics', 'https://github.com/ultralytics/ultralytics', '2026-03-29T11:45:00Z', 'Atualizações em pipelines de treino e export para deploy.', 'Updates in training pipelines and export for deployment.'),
  ('up-3', 'microsoft/autogen', 'https://github.com/microsoft/autogen', '2026-03-28T18:22:00Z', 'Aprimoramentos na comunicação entre agentes e ferramentas.', 'Improvements to agent-to-tool communication.')
on conflict (id) do update
set
  repo_full_name = excluded.repo_full_name,
  repo_url = excluded.repo_url,
  updated_at = excluded.updated_at,
  summary_pt = excluded.summary_pt,
  summary_en = excluded.summary_en;

insert into milestones (id, title_pt, title_en, status, subject_id, reference_url, notes_pt, notes_en)
values
  ('ms-1', 'Montar trilha de estudos de Agentes', 'Build Agent learning track', 'in-progress', 'agentes-inteligentes', null, 'Definir sequência Foundation -> Intermediate -> Advanced.', 'Define Foundation -> Intermediate -> Advanced sequence.'),
  ('ms-2', 'Publicar resumo técnico no LinkedIn', 'Publish technical recap on LinkedIn', 'todo', 'large-language-models', null, 'Usar template bilíngue com resultados da semana.', 'Use bilingual template with weekly outcomes.'),
  ('ms-3', 'Concluir mini-projeto de visão com YOLO', 'Finish YOLO mini vision project', 'todo', 'visao-computacional', 'https://github.com/ultralytics/ultralytics', 'Registrar benchmark e aprendizados no hub.', 'Record benchmark and learnings in the hub.')
on conflict (id) do update
set
  title_pt = excluded.title_pt,
  title_en = excluded.title_en,
  status = excluded.status,
  subject_id = excluded.subject_id,
  reference_url = excluded.reference_url,
  notes_pt = excluded.notes_pt,
  notes_en = excluded.notes_en;
insert into course_modules (id, title_pt, title_en, start_date, end_date, cohort, professor)
values
  ('estatistica', 'Estatística', 'Statistics', '2026-05-02', '2026-05-02', 'Inteligência Artificial e Ciência de Dados 2026/1', 'JULIO CESAR NIEVOLA'),
  ('introducao-python', 'Introdução à Linguagem Python', 'Introduction to Python', '2026-05-02', '2026-05-02', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Vilmar Abreu Junior'),
  ('analise-preparacao-dados', 'Análise e Preparação de Dados', 'Data Analysis and Preparation', '2026-05-30', '2026-06-13', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Jean Paul Barddal'),
  ('aprendizagem-maquina', 'Aprendizagem de Máquina', 'Machine Learning', '2026-06-27', '2026-07-11', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Alceu de Souza Britto Junior'),
  ('projeto-ciencia-dados', 'Projeto em Ciência de Dados', 'Data Science Project', '2026-06-27', '2026-07-11', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Jean Paul Barddal'),
  ('mineracao-series-temporais', 'Mineração de Séries Temporais', 'Time Series Mining', '2026-08-01', '2026-08-15', 'Inteligência Artificial e Ciência de Dados 2026/1', 'VINICIUS MOURAO ALVES DE SOUZA'),
  ('big-data-analytics', 'Big Data Analytics', 'Big Data Analytics', '2026-09-12', '2026-09-26', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Eduardo Kugler Viegas'),
  ('mineracao-processos', 'Mineração de Processos', 'Process Mining', '2026-09-26', '2026-10-10', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Cleiton dos Santos Garcia'),
  ('deep-learning', 'Deep Learning', 'Deep Learning', '2026-11-21', '2026-12-19', 'Inteligência Artificial e Ciência de Dados 2026/1', 'ANDRE GUSTAVO HOCHULI'),
  ('visao-computacional-modulo', 'Visão Computacional', 'Computer Vision', '2026-11-21', '2026-12-19', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Rayson Bartoski Laroca dos Santos'),
  ('agentes-inteligentes-modulo', 'Agentes Inteligentes', 'Intelligent Agents', '2027-02-20', '2027-03-06', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Elisa Terumi Rubel Schneider'),
  ('llms-modulo', 'Large Language Models', 'Large Language Models', '2027-02-20', '2027-03-06', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Emerson Cabrera Paraiso'),
  ('mlops-llmops', 'MLOps e LLMOps', 'MLOps and LLMOps', '2027-04-17', '2027-05-15', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Lucca Portes Cavalheiro'),
  ('sistemas-autonomos', 'Sistemas Autônomos Inteligentes', 'Intelligent Autonomous Systems', '2027-04-17', '2027-05-15', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Marco Antonio Simoes Teixeira'),
  ('aplicacoes-llms', 'Aplicações de LLMs', 'LLM Applications', '2027-06-19', '2027-07-03', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Professor de Especialização Pucpr, João Pedro Santos Rodrigues'),
  ('projeto-llms', 'Projeto de LLMs', 'LLM Project', '2027-08-07', '2027-08-07', 'Inteligência Artificial e Ciência de Dados 2026/1', 'Professor de Especialização Pucpr')
on conflict (id) do update
set
  title_pt = excluded.title_pt,
  title_en = excluded.title_en,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  cohort = excluded.cohort,
  professor = excluded.professor;

insert into study_notebooks (id, module_id, status, summary_pt, summary_en, focus_pt, focus_en, updated_at)
values
  ('nb-estatistica', 'estatistica', 'planned', 'Módulo de nivelamento para revisar conceitos de probabilidade, distribuição e interpretação de métricas.', 'Leveling module to review probability, distributions, and metric interpretation.', 'Separar fórmulas-chave e montar uma cola visual para consulta rápida.', 'Separate key formulas and build a quick visual reference sheet.', '2026-03-29T18:30:00Z'),
  ('nb-python', 'introducao-python', 'planned', 'Módulo rápido para alinhar sintaxe, ambiente e fluência básica em Python.', 'Quick module to align syntax, environment, and basic Python fluency.', 'Preparar ambiente local e uma lista de exercícios curtos.', 'Prepare the local environment and a short exercise list.', '2026-03-29T18:35:00Z'),
  ('nb-dados', 'analise-preparacao-dados', 'active', 'Disciplina central para pipeline analítico, limpeza, exploração e preparação de datasets.', 'Core subject for analytical pipelines, cleaning, exploration, and dataset preparation.', 'Mapear um fluxo padrão com pandas, validação e feature engineering inicial.', 'Map a standard flow with pandas, validation, and initial feature engineering.', '2026-03-29T18:40:00Z'),
  ('nb-agentes', 'agentes-inteligentes-modulo', 'active', 'Disciplina-chave da pós para arquitetura de agentes, ferramentas, memória e avaliação de fluxos autônomos.', 'Key program subject for agent architecture, tools, memory, and autonomous workflow evaluation.', 'Conectar a disciplina aos repositórios LangChain, AutoGen e OpenAI Agents já curados no app.', 'Connect the subject to the LangChain, AutoGen, and OpenAI Agents repositories already curated in the app.', '2026-03-29T18:45:00Z'),
  ('nb-llm', 'llms-modulo', 'review', 'Módulo voltado a fundamentos, inferência e estratégias de avaliação de grandes modelos de linguagem.', 'Module focused on LLM foundations, inference, and evaluation strategies.', 'Organizar diferenças entre serving, fine-tuning, alignment e avaliação.', 'Organize differences between serving, fine-tuning, alignment, and evaluation.', '2026-03-29T18:50:00Z'),
  ('nb-mlops', 'mlops-llmops', 'planned', 'Ponte entre experimentação e operação de modelos, com foco em versionamento, deploy, monitoramento e governança.', 'Bridge between experimentation and model operations, focused on versioning, deployment, monitoring, and governance.', 'Levantar stack mínima com GitHub, Vercel, Supabase e monitoramento de pipelines.', 'Define a minimum stack with GitHub, Vercel, Supabase, and pipeline monitoring.', '2026-03-29T18:55:00Z')
on conflict (id) do update
set
  module_id = excluded.module_id,
  status = excluded.status,
  summary_pt = excluded.summary_pt,
  summary_en = excluded.summary_en,
  focus_pt = excluded.focus_pt,
  focus_en = excluded.focus_en,
  updated_at = excluded.updated_at;

insert into notebook_tasks (id, notebook_id, title_pt, title_en, status)
values
  ('task-estatistica-1', 'nb-estatistica', 'Revisar média, mediana, variância e desvio padrão', 'Review mean, median, variance, and standard deviation', 'todo'),
  ('task-estatistica-2', 'nb-estatistica', 'Criar um resumo com exemplos em Python', 'Create a summary with Python examples', 'todo'),
  ('task-python-1', 'nb-python', 'Validar ambiente com Python, pip e Jupyter', 'Validate environment with Python, pip, and Jupyter', 'in-progress'),
  ('task-python-2', 'nb-python', 'Montar cheatsheet de listas, dicionários e funções', 'Build a cheatsheet for lists, dictionaries, and functions', 'todo'),
  ('task-dados-1', 'nb-dados', 'Criar template de notebook para EDA', 'Create a notebook template for EDA', 'done'),
  ('task-dados-2', 'nb-dados', 'Listar técnicas de imputação e normalização', 'List imputation and normalization techniques', 'in-progress'),
  ('task-dados-3', 'nb-dados', 'Separar dataset público para prática', 'Select a public dataset for practice', 'todo'),
  ('task-agentes-1', 'nb-agentes', 'Definir glossário de agentes, ferramentas e memória', 'Define a glossary for agents, tools, and memory', 'done'),
  ('task-agentes-2', 'nb-agentes', 'Esboçar mini projeto com agente executor e avaliador', 'Outline a mini project with an executor and evaluator agent', 'in-progress'),
  ('task-agentes-3', 'nb-agentes', 'Registrar comparativo entre frameworks', 'Record a comparison between frameworks', 'todo'),
  ('task-llm-1', 'nb-llm', 'Revisar conceitos de tokens, contexto e attention', 'Review tokens, context, and attention concepts', 'done'),
  ('task-llm-2', 'nb-llm', 'Consolidar mapa mental de serving com vLLM e llama.cpp', 'Consolidate a serving mind map with vLLM and llama.cpp', 'done'),
  ('task-llm-3', 'nb-llm', 'Preparar roteiro de revisão para avaliação final', 'Prepare a review script for final assessment', 'in-progress'),
  ('task-mlops-1', 'nb-mlops', 'Mapear ciclo de vida de modelos usado no curso', 'Map the model lifecycle used in the course', 'todo'),
  ('task-mlops-2', 'nb-mlops', 'Definir critérios de observabilidade para aplicações com LLM', 'Define observability criteria for LLM applications', 'todo')
on conflict (id) do update
set
  notebook_id = excluded.notebook_id,
  title_pt = excluded.title_pt,
  title_en = excluded.title_en,
  status = excluded.status;