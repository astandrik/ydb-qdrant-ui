import { VectorDimensionsSectionBaseProps } from "./VectorDimensionsSection";

export const vectorDimensionsSectionEnProps: VectorDimensionsSectionBaseProps =
  {
    title: "Recommended Vector Dimensions",
    description:
      "When creating a collection, you must specify the vector size matching your embedding model. Below are popular models with their dimensions and typical use cases:",
    commercialModelsTitle: "Commercial API Models",
    commercialModelsData: [
      {
        provider: "OpenAI",
        model: "text-embedding-3-small",
        dimensions: "1536 (default, can reduce to 256-1536)",
        useCases: "RAG, semantic search, general-purpose embeddings",
      },
      {
        provider: "OpenAI",
        model: "text-embedding-3-large",
        dimensions: "3072 (default, can reduce to 256, 512, 1024, 1536, 3072)",
        useCases: "High-accuracy RAG, multilingual tasks",
      },
      {
        provider: "OpenAI",
        model: "text-embedding-ada-002",
        dimensions: "1536",
        useCases: "Legacy model, widely adopted",
      },
      {
        provider: "OpenAI (Legacy)",
        model: "text-search-curie-doc-001",
        dimensions: "4096",
        useCases: "Legacy GPT-3 model, deprecated",
      },
      {
        provider: "OpenAI (Legacy)",
        model: "text-search-davinci-doc-001",
        dimensions: "12288",
        useCases: "Legacy GPT-3 model, deprecated",
      },
      {
        provider: "Cohere",
        model: "embed-v4.0",
        dimensions: "256, 512, 1024, 1536 (default)",
        useCases: "Multimodal (text + image), RAG, enterprise search",
      },
      {
        provider: "Cohere",
        model: "embed-english-v3.0",
        dimensions: "1024",
        useCases: "English text, semantic search, classification",
      },
      {
        provider: "Cohere",
        model: "embed-multilingual-v3.0",
        dimensions: "1024",
        useCases: "100+ languages, long-document retrieval, clustering",
      },
      {
        provider: "Google",
        model: "gemini-embedding-001",
        dimensions: "3072 (configurable)",
        useCases: "Multilingual, general-purpose, RAG",
      },
      {
        provider: "Google",
        model: "text-embedding-004",
        dimensions: "768",
        useCases: "General-purpose text embeddings",
      },
      {
        provider: "Google",
        model: "text-embedding-005",
        dimensions: "768",
        useCases: "Improved version of text-embedding-004",
      },
      {
        provider: "Google",
        model: "text-multilingual-embedding-002",
        dimensions: "768",
        useCases: "Multilingual text embeddings",
      },
    ],
    openSourceModelsTitle: "Open-Source Models (HuggingFace)",
    openSourceModelsData: [
      {
        model: "sentence-transformers/all-MiniLM-L6-v2",
        dimensions: "384",
        useCases: "Fast semantic search, low-resource environments",
      },
      {
        model: "BAAI/bge-base-en-v1.5",
        dimensions: "768",
        useCases: "RAG, retrieval, English text",
      },
      {
        model: "BAAI/bge-large-en-v1.5",
        dimensions: "1024",
        useCases: "High-accuracy RAG, English text",
      },
      {
        model: "BAAI/bge-m3",
        dimensions: "1024",
        useCases: "Multilingual, dense/sparse/multi-vector",
      },
      {
        model: "intfloat/e5-base-v2",
        dimensions: "768",
        useCases: "General retrieval, English text",
      },
      {
        model: "intfloat/e5-large-v2",
        dimensions: "1024",
        useCases: "High-accuracy retrieval, English text",
      },
      {
        model: "intfloat/e5-mistral-7b-instruct",
        dimensions: "4096",
        useCases: "High-dimensional embeddings, advanced RAG",
      },
      {
        model: "nomic-ai/nomic-embed-text-v1",
        dimensions: "768",
        useCases: "General-purpose, open weights",
      },
    ],
    choosingDimensionsTitle: "Choosing Dimensions",
    choosingDimensionsItems: [
      {
        title: "Higher dimensions (1024-4096)",
        description: "Better semantic fidelity, higher storage/compute costs",
      },
      {
        title: "Lower dimensions (384-768)",
        description: "Faster queries, lower costs, suitable for many use cases",
      },
      {
        title: "Variable dimensions",
        description:
          "Some models (OpenAI v3, Cohere v4) allow dimension reduction with minimal accuracy loss",
      },
      {
        title: "Legacy models",
        description:
          "Older OpenAI GPT-3 models (Curie: 4096, Davinci: 12288) are deprecated but may still be in use",
      },
    ],
    referencesTitle: "References",
    references: [
      {
        label: "OpenAI Embeddings Guide",
        href: "https://platform.openai.com/docs/guides/embeddings",
      },
      {
        label: "Cohere Embed Models",
        href: "https://docs.cohere.com/docs/cohere-embed",
      },
      {
        label: "Google Gemini Embeddings",
        href: "https://ai.google.dev/gemini-api/docs/embeddings",
      },
      {
        label: "HuggingFace Sentence Transformers",
        href: "https://huggingface.co/sentence-transformers",
      },
    ],
    dimensionsLabel: "Dimensions",
    useCasesLabel: "Use Cases",
    anchorAriaLabel: "Anchor to this section",
  };

export const vectorDimensionsSectionRuProps: VectorDimensionsSectionBaseProps =
  {
    title: "Рекомендуемые размерности векторов",
    description:
      "При создании коллекции необходимо указать размер вектора, соответствующий выбранной модели эмбеддингов. Ниже приведены распространённые модели с их размерностями и типичными сценариями использования:",
    commercialModelsTitle: "Коммерческие API‑модели",
    commercialModelsData: [
      {
        provider: "OpenAI",
        model: "text-embedding-3-small",
        dimensions: "1536 (по умолчанию, можно уменьшать до 256–1536)",
        useCases:
          "RAG, семантический поиск, универсальные эмбеддинги общего назначения",
      },
      {
        provider: "OpenAI",
        model: "text-embedding-3-large",
        dimensions:
          "3072 (по умолчанию, можно уменьшать до 256, 512, 1024, 1536, 3072)",
        useCases: "Высокоточный RAG, многоязычные задачи",
      },
      {
        provider: "OpenAI",
        model: "text-embedding-ada-002",
        dimensions: "1536",
        useCases: "Устаревшая, но широко используемая модель",
      },
      {
        provider: "OpenAI (Legacy)",
        model: "text-search-curie-doc-001",
        dimensions: "4096",
        useCases: "Устаревшая модель GPT‑3, снята с поддержки",
      },
      {
        provider: "OpenAI (Legacy)",
        model: "text-search-davinci-doc-001",
        dimensions: "12288",
        useCases: "Устаревшая модель GPT‑3, снята с поддержки",
      },
      {
        provider: "Cohere",
        model: "embed-v4.0",
        dimensions: "256, 512, 1024, 1536 (по умолчанию)",
        useCases:
          "Мультимодальность (текст + изображение), RAG, корпоративный поиск",
      },
      {
        provider: "Cohere",
        model: "embed-english-v3.0",
        dimensions: "1024",
        useCases: "Англоязычный текст, семантический поиск, классификация",
      },
      {
        provider: "Cohere",
        model: "embed-multilingual-v3.0",
        dimensions: "1024",
        useCases: "100+ языков, поиск по длинным документам, кластеризация",
      },
      {
        provider: "Google",
        model: "gemini-embedding-001",
        dimensions: "3072 (настраиваемая)",
        useCases: "Многоязычные задачи, общий RAG, задачи общего назначения",
      },
      {
        provider: "Google",
        model: "text-embedding-004",
        dimensions: "768",
        useCases: "Эмбеддинги общего назначения для текста",
      },
      {
        provider: "Google",
        model: "text-embedding-005",
        dimensions: "768",
        useCases: "Улучшенная версия text-embedding-004",
      },
      {
        provider: "Google",
        model: "text-multilingual-embedding-002",
        dimensions: "768",
        useCases: "Многоязычные эмбеддинги текста",
      },
    ],
    openSourceModelsTitle: "Open‑source‑модели (HuggingFace)",
    openSourceModelsData: [
      {
        model: "sentence-transformers/all-MiniLM-L6-v2",
        dimensions: "384",
        useCases:
          "Быстрый семантический поиск, сценарии с ограниченными ресурсами",
      },
      {
        model: "BAAI/bge-base-en-v1.5",
        dimensions: "768",
        useCases: "RAG и поиск по документам на английском",
      },
      {
        model: "BAAI/bge-large-en-v1.5",
        dimensions: "1024",
        useCases: "Высокоточный RAG и поиск по английским текстам",
      },
      {
        model: "BAAI/bge-m3",
        dimensions: "1024",
        useCases: "Многоязычные сценарии, dense/sparse/multi‑vector",
      },
      {
        model: "intfloat/e5-base-v2",
        dimensions: "768",
        useCases: "Общий поиск и ретривал для английского текста",
      },
      {
        model: "intfloat/e5-large-v2",
        dimensions: "1024",
        useCases: "Высокоточный ретривал для английских данных",
      },
      {
        model: "intfloat/e5-mistral-7b-instruct",
        dimensions: "4096",
        useCases: "Высокомерные векторы для продвинутых RAG‑сценариев",
      },
      {
        model: "nomic-ai/nomic-embed-text-v1",
        dimensions: "768",
        useCases: "Универсальные эмбеддинги с открытыми весами",
      },
    ],
    choosingDimensionsTitle: "Как выбирать размерность",
    choosingDimensionsItems: [
      {
        title: "Высокие размерности (1024–4096)",
        description:
          "Лучшая семантическая точность, но большее потребление памяти и вычислительных ресурсов",
      },
      {
        title: "Низкие размерности (384–768)",
        description:
          "Более быстрые запросы и меньшие затраты, подходят для многих сценариев",
      },
      {
        title: "Переменная размерность",
        description:
          "Некоторые модели (OpenAI v3, Cohere v4) позволяют уменьшать размерность с минимальной потерей точности",
      },
      {
        title: "Устаревшие модели",
        description:
          "Старые модели OpenAI GPT‑3 (Curie: 4096, Davinci: 12288) считаются устаревшими, но всё ещё могут использоваться",
      },
    ],
    referencesTitle: "Полезные ссылки",
    references: [
      {
        label: "Руководство по эмбеддингам OpenAI",
        href: "https://platform.openai.com/docs/guides/embeddings",
      },
      {
        label: "Модели Cohere Embed",
        href: "https://docs.cohere.com/docs/cohere-embed",
      },
      {
        label: "Эмбеддинги Google Gemini",
        href: "https://ai.google.dev/gemini-api/docs/embeddings",
      },
      {
        label: "HuggingFace Sentence Transformers",
        href: "https://huggingface.co/sentence-transformers",
      },
    ],
    dimensionsLabel: "Размерность",
    useCasesLabel: "Сценарии использования",
    anchorAriaLabel: "Ссылка-якорь на эту секцию",
  };
