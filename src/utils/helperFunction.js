function formatPrice(number) {
  // Mengecek apakah input adalah angka
  if (isNaN(number)) {
    return 'Invalid Input';
  }

  // Mengonversi angka ke format harga dengan titik sebagai pemisah per tiga angka
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export { formatPrice };
