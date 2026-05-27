import { VectorDimensionsSectionBaseProps } from "./VectorDimensionsSection";

const OPENAI_EMBEDDINGS_DOCS =
  "https://developers.openai.com/api/docs/guides/embeddings";
const COHERE_EMBEDDINGS_DOCS = "https://docs.cohere.com/docs/cohere-embed";
const GOOGLE_EMBEDDINGS_DOCS =
  "https://ai.google.dev/gemini-api/docs/embeddings";
const VOYAGE_EMBEDDINGS_DOCS = "https://docs.voyageai.com/docs/embeddings";
const AMAZON_TITAN_EMBEDDINGS_DOCS =
  "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html";
const HUGGINGFACE_SENTENCE_TRANSFORMERS =
  "https://huggingface.co/sentence-transformers";

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
        href: OPENAI_EMBEDDINGS_DOCS,
        dimensions: "1536 (default, configurable lower via dimensions)",
        useCases: "RAG, semantic search, general-purpose embeddings",
      },
      {
        provider: "OpenAI",
        model: "text-embedding-3-large",
        href: OPENAI_EMBEDDINGS_DOCS,
        dimensions: "3072 (default, configurable lower via dimensions)",
        useCases: "High-accuracy RAG, multilingual tasks",
      },
      {
        provider: "OpenAI",
        model: "text-embedding-ada-002",
        href: OPENAI_EMBEDDINGS_DOCS,
        dimensions: "1536",
        useCases: "Legacy general-purpose embeddings",
      },
      {
        provider: "Cohere",
        model: "embed-v4.0",
        href: COHERE_EMBEDDINGS_DOCS,
        dimensions: "1536 (default), 1024, 512, 256",
        useCases: "Multimodal text/image embeddings, RAG, enterprise search",
      },
      {
        provider: "Cohere",
        model: "embed-english-v3.0",
        href: COHERE_EMBEDDINGS_DOCS,
        dimensions: "1024",
        useCases: "English text, semantic search, classification",
      },
      {
        provider: "Cohere",
        model: "embed-multilingual-v3.0",
        href: COHERE_EMBEDDINGS_DOCS,
        dimensions: "1024",
        useCases: "100+ languages, long-document retrieval, clustering",
      },
      {
        provider: "Google",
        model: "gemini-embedding-2",
        href: GOOGLE_EMBEDDINGS_DOCS,
        dimensions: "3072 (default; recommended 768, 1536, 3072)",
        useCases: "Multimodal and multilingual search, RAG, classification",
      },
      {
        provider: "Google",
        model: "gemini-embedding-001",
        href: GOOGLE_EMBEDDINGS_DOCS,
        dimensions: "3072 (default; recommended 768, 1536, 3072)",
        useCases: "Text-only embeddings, retrieval, classification, clustering",
      },
      {
        provider: "Voyage AI",
        model: "voyage-4-large / voyage-4 / voyage-4-lite",
        href: VOYAGE_EMBEDDINGS_DOCS,
        dimensions: "1024 (default), 2048, 512, 256",
        useCases: "General-purpose and multilingual retrieval",
      },
      {
        provider: "Voyage AI",
        model: "voyage-code-3",
        href: VOYAGE_EMBEDDINGS_DOCS,
        dimensions: "1024 (default), 2048, 512, 256",
        useCases: "Code search and code-oriented RAG",
      },
      {
        provider: "Amazon Bedrock",
        model: "amazon.titan-embed-text-v2:0",
        href: AMAZON_TITAN_EMBEDDINGS_DOCS,
        dimensions: "1024 (default), 512, 256",
        useCases: "RAG, document search, classification on Bedrock",
      },
    ],
    openSourceModelsTitle: "Open-source / Open-weight Models (Hugging Face)",
    openSourceModelsData: [
      {
        model: "voyageai/voyage-4-nano",
        href: "https://huggingface.co/voyageai/voyage-4-nano",
        dimensions: "1024 (default), 2048, 512, 256",
        useCases: "Open-weight compact Voyage 4 retrieval model",
      },
      {
        model: "Qwen/Qwen3-Embedding-0.6B",
        href: "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B",
        dimensions: "1024 (custom 32-1024)",
        useCases: "Multilingual retrieval, code retrieval, efficient deployment",
      },
      {
        model: "Qwen/Qwen3-Embedding-4B",
        href: "https://huggingface.co/Qwen/Qwen3-Embedding-4B",
        dimensions: "2560 (custom lower dimensions)",
        useCases: "High-quality multilingual and code retrieval",
      },
      {
        model: "Qwen/Qwen3-Embedding-8B",
        href: "https://huggingface.co/Qwen/Qwen3-Embedding-8B",
        dimensions: "4096 (custom lower dimensions)",
        useCases: "Highest-quality Qwen3 retrieval workloads",
      },
      {
        model: "BAAI/bge-m3",
        href: "https://huggingface.co/BAAI/bge-m3",
        dimensions: "1024",
        useCases: "Multilingual dense, sparse, and multi-vector retrieval",
      },
      {
        model: "BAAI/bge-base-en-v1.5",
        href: "https://huggingface.co/BAAI/bge-base-en-v1.5",
        dimensions: "768",
        useCases: "English RAG and document retrieval",
      },
      {
        model: "BAAI/bge-large-en-v1.5",
        href: "https://huggingface.co/BAAI/bge-large-en-v1.5",
        dimensions: "1024",
        useCases: "Higher-accuracy English RAG and retrieval",
      },
      {
        model: "intfloat/multilingual-e5-large-instruct",
        href: "https://huggingface.co/intfloat/multilingual-e5-large-instruct",
        dimensions: "1024",
        useCases: "Instruction-aware multilingual retrieval",
      },
      {
        model: "google/embeddinggemma-300m",
        href: "https://huggingface.co/google/embeddinggemma-300m",
        dimensions: "768 (can truncate to 512, 256, 128)",
        useCases: "Small multilingual retrieval model for local deployment",
      },
      {
        model: "nomic-ai/nomic-embed-text-v1.5",
        href: "https://huggingface.co/nomic-ai/nomic-embed-text-v1.5",
        dimensions: "768 (can truncate to 512, 256, 128, 64)",
        useCases: "Long-context text embeddings with task prefixes",
      },
      {
        model: "mixedbread-ai/mxbai-embed-large-v1",
        href: "https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1",
        dimensions: "1024 (Matryoshka truncation supported)",
        useCases: "English retrieval with local and quantized deployments",
      },
      {
        model: "sentence-transformers/all-MiniLM-L6-v2",
        href: "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2",
        dimensions: "384",
        useCases: "Fast semantic search, low-resource environments",
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
          "Models with Matryoshka or output-dimension controls let you choose the vector size at embedding time",
      },
      {
        title: "Collection compatibility",
        description:
          "Changing the embedding model or vector size requires a new collection or re-indexing existing vectors",
      },
    ],
    referencesTitle: "References",
    references: [
      {
        label: "OpenAI Embeddings Guide",
        href: OPENAI_EMBEDDINGS_DOCS,
      },
      {
        label: "Cohere Embed Models",
        href: COHERE_EMBEDDINGS_DOCS,
      },
      {
        label: "Google Gemini Embeddings",
        href: GOOGLE_EMBEDDINGS_DOCS,
      },
      {
        label: "Voyage AI Embeddings",
        href: VOYAGE_EMBEDDINGS_DOCS,
      },
      {
        label: "Amazon Titan Text Embeddings",
        href: AMAZON_TITAN_EMBEDDINGS_DOCS,
      },
      {
        label: "Hugging Face Sentence Transformers",
        href: HUGGINGFACE_SENTENCE_TRANSFORMERS,
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
        href: OPENAI_EMBEDDINGS_DOCS,
        dimensions:
          "1536 (по умолчанию, можно уменьшать через dimensions)",
        useCases:
          "RAG, семантический поиск, универсальные эмбеддинги общего назначения",
      },
      {
        provider: "OpenAI",
        model: "text-embedding-3-large",
        href: OPENAI_EMBEDDINGS_DOCS,
        dimensions:
          "3072 (по умолчанию, можно уменьшать через dimensions)",
        useCases: "Высокоточный RAG, многоязычные задачи",
      },
      {
        provider: "OpenAI",
        model: "text-embedding-ada-002",
        href: OPENAI_EMBEDDINGS_DOCS,
        dimensions: "1536",
        useCases: "Устаревшие универсальные эмбеддинги",
      },
      {
        provider: "Cohere",
        model: "embed-v4.0",
        href: COHERE_EMBEDDINGS_DOCS,
        dimensions: "1536 (по умолчанию), 1024, 512, 256",
        useCases:
          "Мультимодальные эмбеддинги текста и изображений, RAG, корпоративный поиск",
      },
      {
        provider: "Cohere",
        model: "embed-english-v3.0",
        href: COHERE_EMBEDDINGS_DOCS,
        dimensions: "1024",
        useCases: "Англоязычный текст, семантический поиск, классификация",
      },
      {
        provider: "Cohere",
        model: "embed-multilingual-v3.0",
        href: COHERE_EMBEDDINGS_DOCS,
        dimensions: "1024",
        useCases: "100+ языков, поиск по длинным документам, кластеризация",
      },
      {
        provider: "Google",
        model: "gemini-embedding-2",
        href: GOOGLE_EMBEDDINGS_DOCS,
        dimensions: "3072 (по умолчанию; рекомендованы 768, 1536, 3072)",
        useCases:
          "Мультимодальный и многоязычный поиск, RAG, классификация",
      },
      {
        provider: "Google",
        model: "gemini-embedding-001",
        href: GOOGLE_EMBEDDINGS_DOCS,
        dimensions: "3072 (по умолчанию; рекомендованы 768, 1536, 3072)",
        useCases:
          "Текстовые эмбеддинги, ретривал, классификация, кластеризация",
      },
      {
        provider: "Voyage AI",
        model: "voyage-4-large / voyage-4 / voyage-4-lite",
        href: VOYAGE_EMBEDDINGS_DOCS,
        dimensions: "1024 (по умолчанию), 2048, 512, 256",
        useCases: "Универсальный и многоязычный ретривал",
      },
      {
        provider: "Voyage AI",
        model: "voyage-code-3",
        href: VOYAGE_EMBEDDINGS_DOCS,
        dimensions: "1024 (по умолчанию), 2048, 512, 256",
        useCases: "Поиск по коду и code-oriented RAG",
      },
      {
        provider: "Amazon Bedrock",
        model: "amazon.titan-embed-text-v2:0",
        href: AMAZON_TITAN_EMBEDDINGS_DOCS,
        dimensions: "1024 (по умолчанию), 512, 256",
        useCases: "RAG, поиск по документам, классификация в Bedrock",
      },
    ],
    openSourceModelsTitle: "Open-source / open-weight модели (Hugging Face)",
    openSourceModelsData: [
      {
        model: "voyageai/voyage-4-nano",
        href: "https://huggingface.co/voyageai/voyage-4-nano",
        dimensions: "1024 (по умолчанию), 2048, 512, 256",
        useCases: "Компактная open-weight модель Voyage 4 для ретривала",
      },
      {
        model: "Qwen/Qwen3-Embedding-0.6B",
        href: "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B",
        dimensions: "1024 (настраиваемая 32-1024)",
        useCases:
          "Многоязычный ретривал, поиск по коду, эффективный deployment",
      },
      {
        model: "Qwen/Qwen3-Embedding-4B",
        href: "https://huggingface.co/Qwen/Qwen3-Embedding-4B",
        dimensions: "2560 (можно уменьшать)",
        useCases: "Качественный многоязычный и code retrieval",
      },
      {
        model: "Qwen/Qwen3-Embedding-8B",
        href: "https://huggingface.co/Qwen/Qwen3-Embedding-8B",
        dimensions: "4096 (можно уменьшать)",
        useCases: "Самые качественные Qwen3 retrieval-нагрузки",
      },
      {
        model: "BAAI/bge-m3",
        href: "https://huggingface.co/BAAI/bge-m3",
        dimensions: "1024",
        useCases: "Многоязычный dense, sparse и multi-vector retrieval",
      },
      {
        model: "BAAI/bge-base-en-v1.5",
        href: "https://huggingface.co/BAAI/bge-base-en-v1.5",
        dimensions: "768",
        useCases: "RAG и поиск по документам на английском",
      },
      {
        model: "BAAI/bge-large-en-v1.5",
        href: "https://huggingface.co/BAAI/bge-large-en-v1.5",
        dimensions: "1024",
        useCases: "Более точный RAG и поиск по английским текстам",
      },
      {
        model: "intfloat/multilingual-e5-large-instruct",
        href: "https://huggingface.co/intfloat/multilingual-e5-large-instruct",
        dimensions: "1024",
        useCases: "Instruction-aware многоязычный ретривал",
      },
      {
        model: "google/embeddinggemma-300m",
        href: "https://huggingface.co/google/embeddinggemma-300m",
        dimensions: "768 (можно обрезать до 512, 256, 128)",
        useCases: "Небольшая многоязычная модель для локального deployment",
      },
      {
        model: "nomic-ai/nomic-embed-text-v1.5",
        href: "https://huggingface.co/nomic-ai/nomic-embed-text-v1.5",
        dimensions: "768 (можно обрезать до 512, 256, 128, 64)",
        useCases: "Long-context эмбеддинги с task prefixes",
      },
      {
        model: "mixedbread-ai/mxbai-embed-large-v1",
        href: "https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1",
        dimensions: "1024 (поддерживает Matryoshka truncation)",
        useCases: "Англоязычный ретривал, локальные и quantized deployments",
      },
      {
        model: "sentence-transformers/all-MiniLM-L6-v2",
        href: "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2",
        dimensions: "384",
        useCases:
          "Быстрый семантический поиск, сценарии с ограниченными ресурсами",
      },
    ],
    choosingDimensionsTitle: "Как выбирать размерность",
    choosingDimensionsItems: [
      {
        title: "Высокие размерности (1024-4096)",
        description:
          "Лучшая семантическая точность, но большее потребление памяти и вычислительных ресурсов",
      },
      {
        title: "Низкие размерности (384-768)",
        description:
          "Более быстрые запросы и меньшие затраты, подходят для многих сценариев",
      },
      {
        title: "Переменная размерность",
        description:
          "Модели с Matryoshka или output-dimension настройками позволяют выбрать размер вектора при генерации эмбеддингов",
      },
      {
        title: "Совместимость коллекции",
        description:
          "Смена модели эмбеддингов или размера вектора требует новой коллекции либо переиндексации существующих векторов",
      },
    ],
    referencesTitle: "Полезные ссылки",
    references: [
      {
        label: "Руководство по эмбеддингам OpenAI",
        href: OPENAI_EMBEDDINGS_DOCS,
      },
      {
        label: "Модели Cohere Embed",
        href: COHERE_EMBEDDINGS_DOCS,
      },
      {
        label: "Эмбеддинги Google Gemini",
        href: GOOGLE_EMBEDDINGS_DOCS,
      },
      {
        label: "Эмбеддинги Voyage AI",
        href: VOYAGE_EMBEDDINGS_DOCS,
      },
      {
        label: "Amazon Titan Text Embeddings",
        href: AMAZON_TITAN_EMBEDDINGS_DOCS,
      },
      {
        label: "Hugging Face Sentence Transformers",
        href: HUGGINGFACE_SENTENCE_TRANSFORMERS,
      },
    ],
    dimensionsLabel: "Размерность",
    useCasesLabel: "Сценарии использования",
    anchorAriaLabel: "Ссылка-якорь на эту секцию",
  };
