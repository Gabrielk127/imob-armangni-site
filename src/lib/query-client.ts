import { QueryClient } from '@tanstack/react-query'

/**
 * O cliente de query da aplicação.
 *
 * Mora aqui, e não em `main.tsx`, porque o `head` das rotas também precisa
 * dele: é de lá que sai o título com o nome do imóvel, lido do cache que o
 * `loader` aqueceu. O `head` do TanStack Router não recebe o contexto do
 * router, então importar o mesmo cliente é o caminho direto — e continua sendo
 * uma instância só.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // O padrão são 5min: sair de um imóvel, navegar um pouco e voltar
      // significava buscar tudo de novo. Conteúdo de vitrine muda devagar.
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})
