import { format, addMinutes } from 'date-fns'

/**
 * get calendar
 * @returns 
 */
const getCurrentCalendar = async (): Promise<string> => {
    const dataCalendarApi = await fetch('https://hook.us1.make.com/dmmiqn3qaaf8agbblitqb72mehman85x')
    const json: any[] = await dataCalendarApi.json()
    const list = json.reduce((prev, current) => {
        return prev += [
            `Espacio reservado (no disponible): `,
            `Desde ${format(current.date, 'eeee do h:mm a')} `,
            `Hasta ${format(addMinutes(current.date, 45), 'eeee do h:mm a')} \n`,
        ].join(' ')
    }, '')
    return list
}

/**
 * add to calendar
 * @param text 
 * @returns 
 */
const appToCalendar = async (text: string) => {
    try {
        const payload = JSON.parse(text)
        console.log(payload)
        const dataApi = await fetch('https://hook.us1.make.com/59k9r264z8cv9kxdjb6cfdazil4qfgfv', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        return dataApi
    } catch (err) {
        console.log(`error: `, err)
    }
}

export { getCurrentCalendar, appToCalendar }