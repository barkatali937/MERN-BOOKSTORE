export function formateData(date){
    return date.toLocaleDateString('eu-US',{month: 'short', day: 'numeric', year: 'numeric',})
}