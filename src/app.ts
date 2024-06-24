import 'dotenv/config'
import { createBot, MemoryDB, createProvider } from '@builderbot/bot'
import { BaileysProvider } from '@builderbot/provider-baileys'

import AIClass from './services/ai';
import flows from './flows';

const ai = new AIClass(process.env.OPEN_API_KEY, 'gpt-3.5-turbo-16k')

const main = async () => {

    const provider = createProvider(BaileysProvider)

    await createBot({
        database: new MemoryDB(),
        provider,
        flow: flows
    }, { extensions: { ai } })

}

main()