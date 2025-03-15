export function stringToHash(str: string) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Преобразуем в 32-битное целое число
    }
    return hash;
}


export function stringToColor(str: string) {
    // Генерируем хеш на основе строки
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Преобразуем хеш в шестнадцатеричный цвет
    let color = '#';
    for (let i = 0; i < 3; i++) {
        // Берем часть хеша и преобразуем в значение от 0 до 255
        const value = (hash >> (i * 8)) & 0xFF;
        // Преобразуем в двузначный шестнадцатеричный формат
        color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
}
