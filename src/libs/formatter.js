export function formatToRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

export async function handleDelete(route,id) {
    const response = await fetch(`/api/${route}/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data
}

export async function getMobil (id) {
    const response = await fetch(`/api/mobil/${id}`);
    const data = await response.json();
    return data
}