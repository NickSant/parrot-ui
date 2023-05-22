import {faker} from '@faker-js/faker'
import { Flags } from '../models/flags'

export const mockChat = () => (
  {
    id: faker.string.uuid(),
    conversationId: faker.string.uuid(),
    person: {
      id: faker.string.uuid(),
      avatarUrl: faker.image.avatar(),
      name: faker.person.fullName(),
      number: faker.phone.number('+55 ## #####-####')
    },
    status: 'ACTIVE',
    tags: faker.helpers.arrayElements([
      Flags.HAS_DOUBTS,
      Flags.PROMISING,
      Flags.UNPROMISING,
      Flags.RECENTLY_STARTED,
      Flags.STARTED_LONG_AGO,
      Flags.SATISFIED,
      Flags.UNSATISFIED,
    ], Math.floor(Math.random() * 8) + 1)
  }
)

export const mockChatDatabase = Array.from({ length: 35 }).map(() => mockChat())