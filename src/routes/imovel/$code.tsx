import { createFileRoute } from '@tanstack/react-router'
import { propertyDetailQuery } from '@/api/query-options'
import { queryClient } from '@/lib/query-client'
import { head } from '@/lib/seo'
import { PropertyDetails } from '@/features/property-details'

export const Route = createFileRoute('/imovel/$code')({
  // `prefetchQuery` e não `ensureQueryData`: o loader dispara a busca mas não é
  // aguardado. Aguardar travaria a navegação até a resposta — bom no desktop,
  // onde o hover já preencheu o cache, e ruim no celular, onde não existe hover
  // para o `defaultPreload: 'intent'` disparar. Assim o card que o visitante
  // está olhando já começa a carregar o imóvel antes do toque.
  loader: ({ context: { queryClient }, params }) => {
    void queryClient.prefetchQuery(propertyDetailQuery(params.code))
  },

  // Lê do cache em vez de esperar: numa navegação vinda da listagem o preload
  // já respondeu e o título sai com o nome do imóvel. Em carga fria o cache
  // ainda está vazio e vale o código, que pelo menos distingue uma página da
  // outra. Título com o imóvel para robôs que não executam JS (WhatsApp,
  // Facebook) depende de pré-renderização — ver README.
  head: ({ params }) => {
    const property = queryClient.getQueryData(
      propertyDetailQuery(params.code).queryKey
    )

    if (!property) return head({ title: `Imóvel ${params.code}` })

    const local = [property.neighborhood, property.city]
      .filter(Boolean)
      .join(', ')
    // `title` no modelo do site é o rótulo curto (o tipo: "Apartamento");
    // `subtitle` é a chamada de verdade. Um imóvel sem descrição cadastrada
    // ganha uma frase montada em vez de virar só "Apartamento".
    const name = property.subtitle || property.title

    return head({
      title: `${name} — ${params.code}`,
      description:
        property.description[0] ||
        [name, local && `em ${local}`].filter(Boolean).join(' '),
      image: property.images[0],
    })
  },

  component: PropertyDetails,
})
