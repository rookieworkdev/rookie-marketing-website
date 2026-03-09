export type CarouselItem =
  | {
      type: 'image'
      image: string
      label?: string
    }
  | {
      type: 'card'
      title: string
      color: string
    }

export const carouselItems: CarouselItem[] = [
  {
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&auto=format&fit=crop&q=80',
    label: 'Kundservice',
  },
  {
    type: 'card',
    title: 'Sälj',
    color: 'bg-gradient-to-br from-green-600 to-yellow-300',
  },
  {
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&auto=format&fit=crop&q=80',
    label: 'IT & Tech',
  },
  {
    type: 'card',
    title: 'Marknad',
    color: 'bg-gradient-to-bl from-green-600 to-yellow-300',
  },
  {
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    label: 'Ekonomi',
  },
  {
    type: 'card',
    title: 'Admin',
    color: 'bg-gradient-to-tr from-green-600 to-yellow-300',
  },
  {
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    label: 'Logistik',
  },
  {
    type: 'card',
    title: 'HR',
    color: 'bg-gradient-to-tl from-green-600 to-yellow-300',
  },
]
