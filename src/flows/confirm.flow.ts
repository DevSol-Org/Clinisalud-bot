import { addKeyword, EVENTS } from "@builderbot/bot";
import AIClass from "../services/ai";
import { clearHistory, handleHistory, getHistoryParse } from "../utils/handleHistory";
import { getFullCurrentDate } from "../utils/currentDate";
import { appToCalendar } from "src/services/calendar";

const generatePromptToFormatDate = (history: string) => {
    const prompt = `Fecha de Hoy:${getFullCurrentDate()}, Basado en el Historial de conversacion: 
    ${history}
    ----------------
    Fecha ideal:...dd / mm hh:mm`

    return prompt
}

const generateJsonParse = (info: string) => {
    const prompt = `tu tarea principal es analizar la información proporcionada en el contexto y generar un objeto JSON que se adhiera a la estructura especificada a continuación. 

    Contexto: "${info}"
    
    {
        "name": "Johan Rengifo",
        "interest": "n/a",
        "value": "0",
        "email": "email@gmail.com",
        "tel": "3216371215",
        "startDate": "2024/02/15 00:00:00"
    }
    
    Objeto JSON a generar:`

    return prompt
}

/**
 * Encargado de pedir los datos necesarios para registrar el evento en el calendario
 */
const flowConfirm = addKeyword(EVENTS.ACTION).addAction(async (_, { flowDynamic }) => {
    await flowDynamic('Ok, voy a pedirte unos datos para agendar')
    await flowDynamic('¿Cuál es tu nombre?')
}).addAction({ capture: true }, async (ctx, { state, flowDynamic }) => {
    await state.update({ name: ctx.body })
    await flowDynamic(`¿Cuál es tu tipo de documento? Por favor elige entre: CC, TI, CE, PAS`)
}).addAction({ capture: true }, async (ctx, { state, flowDynamic }) => {
    const documentType = ctx.body.trim().toUpperCase(); // Convertimos a mayúsculas y eliminamos espacios en blanco
    if (!['CC', 'TI', 'CE', 'PAS'].includes(documentType)) {
        await flowDynamic('Por favor selecciona un tipo de documento válido: CC, TI, CE, PAS');
        return; // Salimos de la acción para que el usuario vuelva a intentar
    }
    await state.update({ documentType });
    await flowDynamic(`¿Cuál es tu número de documento?`)
}).addAction({ capture: true }, async (ctx, { state, flowDynamic }) => {
    await state.update({ document: ctx.body })
    await flowDynamic(`¿Cuál es tu número de teléfono?`)
}).addAction({ capture: true }, async (ctx, { state, flowDynamic }) => {
    await state.update({ phone: ctx.body })
    await flowDynamic(`¿Cuál es tu dirección de correo electrónico?`)
}).addAction({ capture: true }, async (ctx, { state, extensions, flowDynamic }) => {
    const infoCustomer = `Name: ${state.get('name')}, DocumentType: ${state.get('documentType')}, Document: ${state.get('document')}, Phone: ${state.get('phone')}, Email: ${ctx.body}`
    const ai = extensions.ai as AIClass

    const text = await ai.createChat([
        {
            role: 'system',
            content: generateJsonParse(infoCustomer)
        }
    ])

    await appToCalendar(text)
    clearHistory(state)
    await flowDynamic('¡Listo! Tu Cita fue agendada, ten buen día')
})

export { flowConfirm }