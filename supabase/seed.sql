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